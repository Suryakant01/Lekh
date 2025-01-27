import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from "../Button/Button"
import Input from "../Input/Input"
import Select from "../Select/Select"
import RTE from "../RTE/RTE"
import { useSelector } from 'react-redux'
import dbService from "../../services/appwrite/db.appwrite"
import storageService from '../../services/appwrite/storage.appwrite'


const PostForm = ({ post }) => {

    const [register, handleSubmit, watch, setValue, control, getValues] = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.userData)


    const submit = async (data) => {

        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null

            if (file) storageService.deleteFile(post.$id);

            const dbUpdatePost = await dbService.updatePost(post.$id, {
                ...data,
            })

            if (dbUpdatePost) {
                navigate(`/post/${dbUpdatePost.$id}`)
            }
        } else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null

            if (file) {
                const fileId = file.$id;
                data.featuredImg = fileId;
                const dbCreatePost = await dbService.createPost({
                    ...data,
                    userId: userData.$id,
                })

                if (dbCreatePost) {
                    navigate(`/post/${dbCreatePost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {

        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ''
    }, [])


    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true,})
            }
            return () => subscription.unsubscribe();
        })
     }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={storageService.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}

export default PostForm
