import clsx from 'clsx'
import ProfileIcon from '../../icons/ProfileIcon'
import React, { ComponentProps } from 'react'

interface AvatarProps extends ComponentProps<'div'> {
    photo?: string
}
const Avatar  = ({photo, className}: AvatarProps) => {
  const PF = 'http://localhost:8080/uploads/'
    
  return (
    <div className={clsx('relative bg-gray-400 rounded-full flex items-center justify-center w-14 h-14 ', className)}>
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

const BgImage = ({photo}: AvatarProps) => {
  const PF = 'http://localhost:8080/uploads/'

  return (
    <div className={clsx('w-full shadow-md rounded-md overflow-hidden', photo &&'relative h-80 w-full')}>
        {photo && <img src={PF+photo} alt="image"
                    className='absolute w-full h-full'/>
          }
    </div>
  )
}

export {Avatar, BgImage}