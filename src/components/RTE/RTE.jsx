import { memo } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from "react-hook-form"
import conf from '../../conf/conf'

const RTE = ({ name, control, defaultValue = '', label }) => {

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={conf.tinyMCEApiKey}
                        initialValue={defaultValue}                        
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default memo(RTE)
