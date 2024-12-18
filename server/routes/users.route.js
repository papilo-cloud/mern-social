const userRoute = require('express').Router()
const usersCntrl = require('../controller/users.controller')
const enforce = require('../lib/enforce')
const requireAuth = require('../lib/require-auth')

userRoute.route('/')
    .get(usersCntrl.getUsersRoute)

userRoute.use(requireAuth)
userRoute.route('/:userId')
    .get(usersCntrl.getUserRoute)
    .put(enforce(usersCntrl.userPolicy), usersCntrl.updateUserRoute)
    .delete(enforce(usersCntrl.userPolicy), usersCntrl.deleteUserRoute)


module.exports = userRoute