import { createContext, ReactNode, useContext, useState } from "react"
import {signin} from '../utils/auth/api-auth'
import { auth } from '../utils/auth/auth-helper'

interface ContextProps {
    auth: any
}

const authContext = createContext({} as ContextProps)

export const useAuth = () => {
    return useContext(authContext)
}

export const ContextProvider = ({children}: {children: ReactNode}) => {
    const auth = useProviderAuth()
    return(
        <authContext.Provider value={{
            auth
        }}>
            {children}
        </authContext.Provider>
    )
}

const useProviderAuth = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const onSignin = (val) => {
        setValues(val)
        const user = {
            email: val.email || undefined,
            password: val.password || undefined,
        }
        signin(user).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true})
                })
            }
        })
    }
    const signout = (cb) => {
        return auth.clearJwt(() => {
            setValues({
                email: '',
                error: '',
                password: '',
                redirectToReferrer: false
            })
            cb()
        })
    }

    return {
        onSignin,
        values,
        setValues,
        signout
    }
}