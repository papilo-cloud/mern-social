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
        return response
    } catch (err) {
        return err.response.data
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

const follow = async (userId, credentials, followId) => {
    try {
        const response = await axios.put('/api/users/follow', {userId, followId}, 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${credentials}`
                }
            }
        )
        return response
    } catch (err) {
        return err.response
    }
}

const unfollow = async (userId, credentials, unfollowId) => {
    try {
        const response = await axios.put('/api/users/unfollow', {userId, unfollowId}, 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${credentials}`
                }
            }
        )
        return response
    } catch (err) {
        return err.response
    }
}

const listNewsFeed = async (userId, credentials) => {
    try {
        const response = await axios.get(`/api/posts/feed/${userId}`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const listByUser = async (userId, credentials) => {
    try {
        const response = await axios.get(`/api/posts/by/${userId}`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const createPost = async (userId, credentials, data) => {
    try {
        const response = await axios.post(`/api/posts/new/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const findPeople = async (userId, credentials) => {
    try {
        const response = await axios.get(`/api/users/findpeople`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const removePost = async (postId, credentials) => {
    try {
        const response = await axios.delete(`/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const like = async (postId, credentials, userId) => {
    try {
        const response = await axios.put('/api/posts/like', {postId, userId},{
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}

const unlike = async (postId, credentials, userId) => {
    try {
        const response = await axios.put('/api/posts/unlike', {postId, userId},{
            headers: {
                Authorization: `Bearer ${credentials}`
            }
        })
        return response
    } catch (err) {
        return err.response.data
    }
}
export { list, read, update, remove, upload, follow, unfollow,
    listNewsFeed, listByUser, createPost, findPeople,
    removePost, like, unlike}