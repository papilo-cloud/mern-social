import { Card, CardContent } from '../core/Card/index'
import ProfileIcon from '../icons/ProfileIcon'
import { Avatar } from '../core/Avatar/Avatar'
import { useEffect, useState } from 'react'
import { findPeople, follow } from '../../utils/api-user'
import { auth } from '../../utils/auth/auth-helper'
import { Button, ButtonText } from '../core/Button'
import Snackbar from '../core/Snackbar/Snackbar'
import { useAuth } from '../../context/Context'

const FindPeople = () => {
    const [values, setvalues] = useState<any>({
        users: [],
        open: false,
        message: ''
    })
    const jwt = auth.isAuthenticated()
    const {setOpen, open} = useAuth().auth

    useEffect(() => {
        let fetching = false
        findPeople(jwt.user.id, jwt.token)
            .then(res => {
                if (res.status != 200) {
                    console.log(res)
                } else {
                    if (!fetching) {
                        setvalues({...values, users: res.data, open: false, message: ''})
                    }
                }
            })
        return () => {fetching = true}
    }, [])

    const handleFollowClck = (user, index) => {
        follow(jwt.user.id, jwt.token, user._id)
            .then(res => {
                if (res.status != 200) {
                    console.log(res)
                } else {
                    const follow = values.users
                    follow.splice(index, 1)
                    setvalues({
                        ...values, users: follow, open: true,
                        message: user.name
                    })
                    setOpen(true)
                }
            })
    }

  return (
    <Card className='mt-0 p-0'>
        <Snackbar
            timedOut={3} 
            isOpen={open} 
            message='Following'>{values.message}</Snackbar>
        <CardContent className=' p-5 bg-white rounded drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]'>
            <h1 className=' text-xl font-medium self-start text-left text-green-normal'>Suggestions</h1>
            <CardContent className='users'>
            {
                (values.users || []).map((user, index) =>
                    <ul
                        className='relative flex items-center justify-center m-0 p-0 w-full'
                        key={user._id}>
                        <li className=' cursor-pointer flex-0'>
                        <div className='relative bg-gray-400 rounded-full flex items-center justify-center w-14 h-14 '>
                        {
                            user.photo ?
                            <Avatar photo={user.photo}  /> :
                            <ProfileIcon width={'50px'} />
                        }
                        </div>
                        </li>
                        <li className='text-lg font-medium cursor-pointer ml-2 flex-1'>
                            {user.name}
                        </li>
                        <li className=' cursor-pointer flex-1'>
                            <Button onClick={() => handleFollowClck(user, index)} className='bg-green-normal'>
                                <ButtonText>Follow</ButtonText>
                            </Button>
                        </li>
                </ul> ) 
            }
            </CardContent>
        </CardContent>
    </Card>
  )
}

export default FindPeople