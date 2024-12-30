import './topbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../../utils/auth/auth-helper'
import { useAuth } from '../../../context/Context.tsx'

const Topbar = () => {
    const user = auth.isAuthenticated()
    const {signout} = useAuth().auth
    const navigate = useNavigate()

    const onSignout = () => {
        signout(() => navigate('/', {replace: true, relative: 'path'}))
    }

    return (
        <div className='topbar'>
            <nav>
                <NavLink to='/'>
                    <span>MERN Skeleton</span>
                </NavLink>
            </nav>
            <ul>           
                <li><NavLink to='/users'>users</NavLink></li>
                {
                    user ? <>
                        <li><NavLink to={`/user/${user.user.id}`}>my profile</NavLink></li>
                        <li><button onClick={onSignout}>sign out</button></li>
                        </>: <>
                            <li><NavLink to='/signup'>Sign Up</NavLink></li>
                            <li><NavLink to='/signin'>sign In</NavLink></li>
                        </>
                }
            </ul>
        </div>
    )
}

export default Topbar