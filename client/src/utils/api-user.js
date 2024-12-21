import { data } from "autoprefixer";
import axios from "axios";

const list = async () => {
    try {
        const response = await axios.get('/api/users')
        return response
    } catch (err) {
        return err.response
    }
}

const read = async (params, credentials) => {
    try {
        const response = await axios.get(`/api/users/${params}`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response
    }
}

const update = async (params, data, credentials) => {
    try {
        const response = await axios.put(`/api/users/${params}`, data, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response
    }
}

const remove = async (params, credentials) => {
    try {
        const response = await axios.delete(`/api/users/${params}`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
    } catch (err) {
        return err.response
    }
}

const upload = async (data) => {
    try {
        const response = await axios.post('/api/upload', data)
        return response
    } catch (err) {
        return err.response
    }
}

export { list, read, update, remove, upload}