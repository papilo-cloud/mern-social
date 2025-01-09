import { useEffect } from 'react'
import NewPost from '../Newsfeed/NewPost'
import PostList from '../Newsfeed/PostList'
import { listNewsFeed } from '../../utils/api-user'
import { auth } from '../../utils/auth/auth-helper'
import { usePost } from '../../context/PostContext'

const NewsFeed = () => {
    const { posts, setPosts } = usePost()

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        let ignore = false
        listNewsFeed(jwt.user.id, jwt.token)
            .then(res => {
                if (res.status != 200) {
                    console.log(res)
                } else {
                    if (!ignore) {
                        setPosts(res.data)
                    }
                }
            })
        return () => {
            ignore = true
        }
    }, [])
  return (
    <div className='bg-white rounded drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] justify-end w-full items-end grow'>
        <div className='p-4'>
            <p className='text-xl font-medium self-start text-left text-green-normal'>Feeds</p>
        </div>
        <div className='bg-gray-200 px-8 py-5'>
            <NewPost />
        </div>
        <div className='px-8 py-5'>
            <PostList />
        </div>
        
    </div>
  )
}

export default NewsFeed