const { json } = require('express')
const Post = require('../models/post.model')
const getErrorMessage = require('../lib/dbErrorHandlers')

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    try {
        let posts = await Post.find({postedBy: {
                $in: req.profile.following
            }})
            .populate('comments.postedBy', '_id name')
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
                                .populate('comments.postedBy', '_id name')
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

module.exports = {listNewsFeed, listByUser, createPost}