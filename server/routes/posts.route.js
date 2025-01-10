const {listNewsFeed, listByUser, createPost,
    postsPolicy, removePost,
    like,unlike} = require('../controller/posts.controller')
const enforce = require('../lib/enforce')
const requireAuth = require('../lib/require-auth')

const postRoute = require('express').Router()

postRoute.use(requireAuth)
postRoute.route('/like').put(like)
postRoute.route('/unlike').put(unlike)
postRoute.route('/new/:userId')
    .post(createPost)
postRoute.route('/feed/:userId')
    .get(listNewsFeed)
postRoute.route('/by/:userId')
    .get(listByUser)
postRoute.route('/:postId')
    .delete(enforce(postsPolicy), removePost)
module.exports = postRoute