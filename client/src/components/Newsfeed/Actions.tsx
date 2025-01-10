import LikeIconFill from '../icons/LikeIconFill'
import CommentIcon from '../icons/CommentIcon'
import clsx from 'clsx';

interface ActionsProps {
    likes: number;
    isLiked: boolean;
    comments: number;
    onLiked: () => any
}
const Actions = ({likes, isLiked, comments, onLiked}: ActionsProps) => {
    
    
  return (
    <div className='flex px-5 py-3 border-b-2 border-[#ccc] gap-6'>
        <button onClick={() => onLiked()} className='flex items-center gap-2'>
            <LikeIconFill fill={clsx(!isLiked && '#aaa')} />
            <span>{likes}</span>
        </button>
        <button className='flex items-center gap-2'>
            <CommentIcon />
            <span>{comments}</span>
        </button>
    </div>
  )
}

export default Actions