import { useEffect, useState } from "react"
import { Card, CardContent } from "../core/Card/index"
import ProfileIcon from "../icons/ProfileIcon"
import { Link } from "react-router-dom"
import RightArrow from "../icons/RightArrow"
import { list } from '../../utils/api-user'

const Users = () => {
    const [users, setUsers] = useState<any>([])

    const PF = 'http://localhost:8080/uploads/'

    useEffect(() => {
        list().then(res => {
            if (res.status != 200) {
              console.log(res)
            } else {
              setUsers(res.data)
            }
        })
    }, [])
  return (
    <Card className='p-5'>
            <CardContent className=' p-5 bg-white rounded drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]'>
                <h1 className=' text-xl font-medium self-start text-left'>All Users</h1>
                <CardContent className='users'>
                {
                    (users || []).map(user =>
                        <ul
                            className='relative flex items-center justify-center m-0 p-0 w-full'
                            key={user._id}>
                            <li className=' cursor-pointer flex-0'>
                            <div className='relative bg-gray-400 rounded-full flex items-center justify-center w-14 h-14 '>
                            {
                                user.photo ?
                                <img
                                    className='rounded-full'
                                    src={PF+user.photo} alt="user-photo" 
                                    /> :
                                <ProfileIcon width={'50px'} />
                            }
                            </div>
                            </li>
                            <li className='text-lg font-medium cursor-pointer ml-2 flex-1'>
                                {user.name}
                            </li>
                            <li className=' cursor-pointer flex-1'>
                                <Link to={`/user/${user._id}`}>
                                    <RightArrow className=' absolute top-1 right-0' width={'30px'} height={'30px'} />
                                </Link>
                            </li>
                    </ul> ) 
                }
                </CardContent>
            </CardContent>
        </Card>
  )
}

export default Users