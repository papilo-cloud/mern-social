import ProfileIcon from '../../icons/ProfileIcon'

interface AvatarProps {
    photo?: string
}
const Avatar = ({photo}: AvatarProps) => {
  const PF = 'http://localhost:8080/uploads/'
    
  return (
    <div className='relative bg-gray-400 rounded-full flex items-center justify-center w-14 h-14 '>
        {photo ?
            <img
                className='rounded-full'
                src={PF+photo} alt="user-photo" 
                /> :
            <ProfileIcon width={'50px'} />
        }
    </div>
  )
}

export default Avatar