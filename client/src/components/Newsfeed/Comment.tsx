import React from 'react'
import { Avatar } from '../core/Avatar/Avatar'
import { CommentTypes } from './Comments'

interface CommentProps {
  comments: CommentTypes[]
}

export const Comment = ({comments}: CommentProps) => {
  return (
    <>
      {
        comments.map(com =>
          <div className='w-full relative flex gap-4 items-center'>
          <Avatar photo={com.postedBy.photo} className='w-10 h-10' />
                  <div className='rounded bg-white w-[90%] p-2'>
                    <p className='font-medium'>{com.postedBy.name}</p>
                    <p>{com.text}</p>
                    <span>{new Date(com.created).toDateString()}</span>
                  </div>
              
          </div>
    )}
    </>
  )
}
