import { Navigate, useLocation } from 'react-router-dom'
import { auth } from '../auth/auth-helper'

const PrivateRoute = ({
    children, ...rest
}) => {

    const location = useLocation()
  return (
    <div {...rest}>
        {
            auth.isAuthenticated() ? (
                children
            ) : (
                <Navigate to='/signin' state={{from: location}} />
            )
        }
    </div>
  )
}

export default PrivateRoute