const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    photo: {
        type: String,
        default: ''
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{
        text: String,
        created: {type: Date, default: Date.now},
        postedBy: {type: Schema.Types.ObjectId, ref: 'User'}
    }]
})

const Post = model('Post', PostSchema)

module.exports = Post