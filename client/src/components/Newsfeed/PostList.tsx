import { usePost } from '../../context/PostContext';
import Post from './Post'


const PostList = () => {

  const {posts} = usePost()

  console.log(posts)

  return (
    <div className='flex flex-col gap-4'>
        {
            posts.map((item, idx) => 
                <Post post={item} key={idx}  />)
        }        
    </div>
  )
}

export default PostList