const userRoute = require('express').Router()
const usersCntrl = require('../controller/users.controller')
const enforce = require('../lib/enforce')
const requireAuth = require('../lib/require-auth')

userRoute.route('/')
    .get(usersCntrl.getUsersRoute)

userRoute.use(requireAuth)
userRoute.route('/follow')
    .put(usersCntrl.addFollowing, usersCntrl.addFollower)
userRoute.route('/unfollow')
    .put(usersCntrl.removeFollowing, usersCntrl.removeFollower)
userRoute.route('/:userId')
    .get(usersCntrl.getUserRoute)
    .put( usersCntrl.updateUserRoute)
    .delete( usersCntrl.deleteUserRoute)


module.exports = userRoute