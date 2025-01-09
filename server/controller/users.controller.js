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
            .populate('followers', '_id name photo')
            .populate('following', '_id name photo')
            .exec()
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
        res.status(200).json(updatedUser)
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

let addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, 
            { $push: { following: req.body.followId }}
        )
        next()
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }

}

let addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.followId, 
            { $push: { followers: req.body.userId }},
            { new: true })
        res.json(result)
    } catch (err) {
        return res.status.json({
            error: getErrorMessage(err)
        })
    }
}

let removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, 
            { $pull: { following: req.body.unfollowId } }
        )
        next()
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

let removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.unfollowId, 
            { $pull: { followers: req.body.userId }},
            { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const findPeople = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)

    try {
        let people = await User.find({_id:{$nin: following}}, 'name photo') 
                                    
        res.json(people)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

module.exports = {
    userPolicy, getUserRoute, getUsersRoute,
    deleteUserRoute, updateUserRoute,addFollower,
    addFollowing, removeFollower, removeFollowing,
    findPeople
}