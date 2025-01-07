import { Link } from 'react-router-dom'
import {Avatar} from '../Avatar/Avatar'

interface FollowGridProps {
    array: {
        _id: string,
        name: string,
        photo: string
    }[]
}
const FollowGrid = ({array}: FollowGridProps) => {
  return (
    <div className='w-full relative flex justify-center items-center gap-10 mt-4'>
        {
            array?.map((arr, idx) => 
                    <Link 
                        className='flex flex-col items-center gap-2' 
                        to={`/user/${arr._id}`}
                        key={idx}>
                        <Avatar photo={arr.photo} />
                        <p>{arr.name}</p>
                    </Link>
             )
        }
    </div>
  )
}

export default FollowGrid