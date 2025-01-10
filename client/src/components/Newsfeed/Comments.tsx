import { auth } from '../../utils/auth/auth-helper'
import { comment } from '../../utils/api-user'
import { Avatar } from '../core/Avatar/Avatar'
import { FormField, TextArea } from '../core/Form'
import { Comment } from './Comment';
import { FormEvent, useState } from 'react';

interface CommentsProps {
  postId: string;
  comments: CommentTypes[];
  updatedComments: () => void
}

export interface CommentTypes {
  text: string,
  created: number,
  postedBy: {
    _id: string,
    name: string,
    photo: string
  }
}
const Comments = ({postId, comments, updatedComments}: CommentsProps) => {
    const [text, setText] = useState('')
    const [value, setValue] = useState(comments)
    const jwt = auth.isAuthenticated()

    const handleChange = (event: any) => {
        setText(event.target.value)
    }

    const addComment = (event ) => {
        event.preventDefault()
        const data = {
          text,
          postedBy: jwt.user.id
        }
        console.log(text)
        comment(jwt.token, postId, data)
          .then(res => {
            if (res != 200) {
              console.log(res)
            } else {
              setText('')
              setValue([...comments, res.data.comments])
              console.log(res.data)
            }
          })
    }
    
  return (
    <div className=' px-8 py-2 flex flex-col items-end gap-6'>
        <Comment comments={value} />
        <div className='relative w-full flex items-end gap-4 '>
            <Avatar photo={jwt.user.photo} />
            <FormField className='w-full text-base' onSubmit={addComment}>
                <TextArea className='w-full bg-inherit mb-0' 
                  placeholder='Write something...'
                  value={text}
                  onChange={handleChange} />
                  <button>submit</button>
            </FormField>
        </div>
    </div>
  )
}

export default Comments