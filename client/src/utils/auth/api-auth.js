import axios from "axios";

const create = async (data) => {
    try {
        const response = await axios.post('/api/auth/register', data)
        return response.data
    } catch (err) {
        return err.response.data
    }
}

const signin = async (data) => {
    try {
        const response = await axios.post('/api/auth/signin', data, {
            headers: {
                Accept: 'application/json'
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
    
}

const signout = async () => {
    try {
        const response = await axios.get('/api/auth/signout')
        return response
    } catch (err) {
        return err.response
    }
}

export {create, signin, signout}