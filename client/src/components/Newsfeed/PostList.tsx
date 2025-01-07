import Post from './Post'

interface PostListProps {
    posts: [];
    removeUpdate: (remove:never) => void
}
const PostList = ({posts, removeUpdate}: PostListProps) => {

  return (
    <div className='flex flex-col gap-4'>
        {
            posts.map((item, idx) => 
                <Post post={item} key={idx} onRemove={removeUpdate} />)
        }        
    </div>
  )
}

export default PostList