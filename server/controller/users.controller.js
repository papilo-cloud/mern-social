const bcrypy = require('bcrypt')
const User = require('../models/user.model')
const getErrorMessage = require('../lib/dbErrorHandlers')

let userPolicy = async (req) => {
    let users = await User.findById(req.params.userId)
    let profile = req.profile
    return users.id === profile.id
}

let getUsersRoute = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

let getUserRoute = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

let updateUserRoute = async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypy.genSalt(10)
        req.body.password = await bcrypy.hash(req.body.password, salt)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
        res.json(updatedUser)
    } catch (err) {
        return res.status(401).json({
            error: 'You can only update your account!'
        })
    }
}

let deleteUserRoute = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.json({
            message: 'User has been deleted...'
        })
    } catch (err) {
        return res.status(401).json({
            error: 'You can only delete your account!'
        })
    }
}

module.exports = {
    userPolicy, getUserRoute, getUsersRoute,
    deleteUserRoute, updateUserRoute
}