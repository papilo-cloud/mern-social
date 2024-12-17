const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: "Password is required"
    },
    about: {
        type: String,
        trim: true,
        default: ''
    },
    photo: {
        type: String,
        required: false,
        default: ''
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

const User = model('User', UserSchema)

module.exports = User