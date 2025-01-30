import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dbService from '../services/appwrite/db.appwrite'
import storageService from '../services/appwrite/storage.appwrite'
import parse from "html-react-parser"
import Button from "../components/Button/Button"

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {                   
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        } else navigate("/");
    }, [post, slug, navigate])

    const deletePost =  () => {
         dbService.deletePost(post.$id).then((status) => {
             if (status) {                
                storageService.deleteFile(post.featuredImg);
                navigate('/')
            }
        })
    }

    return post ? (
        <div className="py-8">
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storageService.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                {post.content ? parse(String(post.content)) : <p>No content available</p>}
                </div>
            </div>
        </div>
    ) : null;
}

export default Post
