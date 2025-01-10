import {Avatar, BgImage} from '../core/Avatar/Avatar';
import { auth } from '../../utils/auth/auth-helper'
import { removePost, unlike, like } from '../../utils/api-user'
import DeleteIcon from '../icons/DeleteIcon';
import { usePost } from '../../context/PostContext';
import Comments from './Comments';
import Actions from './Actions';
import { useState } from 'react';

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

  const [values, setValues] = useState({
    like: isLiked(post.likes),
    likes: post.likes.length,
    comments: post.comments.length
  })
  const { removePosts } = usePost()

  function isLiked(likes: any[]) {
    return likes.includes(jwt.user.id)
  }

  const handleLike = () => {
    let callApi = values.like ? unlike : like
    callApi(post._id, jwt.token, jwt.user.id)
        .then(res => {
            if (res.status != 200) {
                console.log(res)
            } else {
                setValues({...values, like: !values.like,
                    likes: res.data.likes?.length
                })
            }
        })
  }

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
            <Actions onLiked={handleLike} likes={values.likes} isLiked={values.like} comments={values.comments} />
            <Comments />
        </div>
    </div>
  )
}

export default Post