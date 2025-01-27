import React, { useEffect, useState } from 'react'
import Card from "../components/Card/Card"
import dbService from '../services/appwrite/db.appwrite'

const AllPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        dbService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            {
                posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Card {...post} />
                    </div>
                ))
            }
        </div>
    )
}

export default AllPost
