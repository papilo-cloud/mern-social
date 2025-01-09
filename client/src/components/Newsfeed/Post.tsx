import LikeIconFill from '../icons/LikeIconFill';
import CommentIcon from '../icons/CommentIcon';
import {Avatar, BgImage} from '../core/Avatar/Avatar';
import { FormField, TextArea } from '../core/Form';
import { auth } from '../../utils/auth/auth-helper'
import { removePost } from '../../utils/api-user'
import DeleteIcon from '../icons/DeleteIcon';
import { usePost } from '../../context/PostContext';

interface PostProps {
    post: {
      comments: [],
      likes: [],
      postedBy: {
        name: string,
        photo: string,
      },
      created: number,
      text: string,
      photo: string,
      _id: string
    };
}
const Post = ({post}: PostProps) => {
  
  const jwt = auth.isAuthenticated()
  const { removePosts } = usePost()

  const deletePost = () => {
    removePost(post._id, jwt.token)
        .then(res => {
            if (res.status != 200) {
                console.log(res)
            } else {
                removePosts(post)
            }
        })
  }
  return (
    <div className='border-2 border-green-light rounded text-base shadow-md'>
        <div className='px-4 py-2 bg-green-light flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Avatar photo={post.postedBy.photo} />
                <div>
                    <p className='text-lg font-semibold'>{post.postedBy.name}</p>
                    <span>{new Date(post.created).toDateString()}</span>
                </div>
            </div>
            <button onClick={deletePost}><DeleteIcon width={24} height={24} fill='#000' /></button>
        </div>
        <div className='w-full px-4 py-8'>
            <BgImage photo={post.photo} />
            <p>{post.text}</p>
        </div>
        <div className='bg-green-light'>
            <div className='flex px-5 py-3 border-b-2 border-[#ccc] gap-6'>
                <button className='flex items-center gap-2'>
                    <LikeIconFill fill='#aaa' />
                    <span>{1}</span>
                </button>
                <button className='flex items-center gap-2'>
                    <CommentIcon />
                    <span>{1}</span>
                </button>
            </div>
            <div className='px-8 py-2 flex items-end gap-4'>
                <Avatar photo={jwt.user.photo} />
                <FormField className='w-full text-base'>
                    <TextArea className='w-full bg-inherit mb-1' placeholder='Write something...' />
                </FormField>
            </div>
        </div>
    </div>
  )
}

export default Post