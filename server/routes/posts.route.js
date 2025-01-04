const {listNewsFeed, listByUser, createPost} = require('../controller/posts.controller')
const requireAuth = require('../lib/require-auth')

const postRoute = require('express').Router()

postRoute.use(requireAuth)
postRoute.route('/new/:userId')
    .post(createPost)
postRoute.route('/feed/:userId')
    .get(listNewsFeed)
postRoute.route('/by/:userId')
    .get(listByUser)

module.exports = postRoute