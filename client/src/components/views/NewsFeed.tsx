import { useEffect, useState } from 'react'
import NewPost from '../Newsfeed/NewPost'
import PostList from '../Newsfeed/PostList'
import { listNewsFeed } from '../../utils/api-user'
import { auth } from '../../utils/auth/auth-helper'

const NewsFeed = () => {
    const [posts, setPosts] = useState<any>([])

    const jwt = auth.isAuthenticated()

    const addPost = (post) => {
        console.log(post)
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }
    // console.log(posts)

    const removePost = (post: any) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }

    useEffect(() => {
        listNewsFeed(jwt.user.id, jwt.token)
            .then(res => {
                if (res.status != 200) {
                    console.log(res)
                } else {
                    setPosts(res.data)
                }
            })
    }, [])
  return (
    <div className='bg-white rounded drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] justify-end w-full items-end grow'>
        <div className='p-4'>
            <p className='text-xl font-medium self-start text-left text-green-normal'>Feeds</p>
        </div>
        <div className='bg-gray-200 px-8 py-5'>
            <NewPost addUpdate={addPost} />
        </div>
        <div className='px-8 py-5'>
            <PostList removeUpdate={removePost} posts={posts} />
        </div>
        
    </div>
  )
}

export default NewsFeed