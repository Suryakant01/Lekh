import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm/PostForm'
import dbService from '../services/appwrite/db.appwrite'


const EditPost = () => {

  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  return post ? (<div className='py-8'> 
    <PostForm post={post}/>
  </div>) : null
}

export default EditPost
