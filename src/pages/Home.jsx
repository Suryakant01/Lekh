import { useEffect, useState } from 'react'
import dbService from '../services/appwrite/db.appwrite'
import Card from "../components/Card/Card"

const Home = () => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    dbService.getAllPosts().then((posts) => {
      console.log("Home page posts", posts);
      console.log("Home page posts.document", posts.documents);

      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])


  if (posts === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className='w-full py-8'>
    <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <Card {...post} />
                </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default Home
