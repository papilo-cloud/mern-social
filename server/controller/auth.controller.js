const config = require('../config/config')
const authenticate = require('../lib/authenticate_password')
const getErrorMessage = require('../lib/dbErrorHandlers')
const encrypyPassword = require('../lib/encrypt_password')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

let createUserRoute = async (req, res) => {
    try {
        const password = await encrypyPassword(req.body.password)
        const user = await new User({
            password,
            name: req.body.name,
            email: req.body.email,
            about: req.body.about
        })
        const users = await user.save()
        res.status(201).json(users)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

let signin = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(401).json({
                error: 'User Not Found!'
            })
        }
        if (!(await authenticate(req.body.password, user.password))) {
            return res.status(401).json({
                error: 'Email and password do not match.'
            })
        }
        const token = jwt.sign(
            {userId: user.id},
            config.jwtSecret
        )
        res.cookie('t', token, {expire: new Date() + 9999})

        return res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                photo: user.photo,
                about: user.about,
            }
        })
    } catch (err) {
        return res.status(400).json({
            error: 'Unable to sign in'
        })
    }
}

let signout = (req, res) =>{
    res.clearCookie('t')
    return res.status(200).json({
        message: 'signed out'
    })
}

module.exports = {createUserRoute, signin, signout}