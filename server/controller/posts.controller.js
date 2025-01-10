const Post = require('../models/post.model')
const getErrorMessage = require('../lib/dbErrorHandlers')
const { response } = require('express')

const postsPolicy = async (req) => {
    let post = await Post.findById(req.params.postId)
    let profile = req.profile
    return Buffer.from(post.postedBy._id, 'utf-8').toString() === profile.id
}
const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let posts = await Post.find({postedBy: {
                $in: req.profile.following
            }})
            .populate('comments.postedBy', '_id name photo')
            .populate('postedBy', '_id name photo')
            .exec()
        res.json(posts)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let posts = await Post.find({postedBy: req.params.userId})
                                .populate('comments.postedBy', '_id name photo')
                                .populate('postedBy', '_id name photo')
                                .exec()
        res.json(posts)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const createPost = async (req, res) => {
    try {
        let post = new Post(req.body)
        await post.save()
        res.status(201).json(post)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        res.json({
            message: 'Post has been deleted...'
        })
    } catch (err) {
        return res.status(401).json({
            error: 'You can only delete your post!'
        })
    }
}

const like = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId,
                                    {
                                        $push:{likes: req.body.userId}
                                    },
                                    {new: true})
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const unlike = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, 
                                    {
                                        $pull: {likes: req.body.userId}
                                    },
                                    {new: true}
        )
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

const comment = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, 
                            {
                                $push: {comments: req.body.comment}
                            },
                            {new: true})
                            .populate('comments.postedBy', '_id name photo')
                            .populate('postedBy', '_id name photo')
                            .exec()
        res.json(result)
                                
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

module.exports = {listNewsFeed, listByUser, createPost, postsPolicy,
    removePost, like, unlike, comment
}