const userRoute = require('express').Router()
const usersCntrl = require('../controller/users.controller')

userRoute.route('/')
    .get(usersCntrl.getUsersRoute)
userRoute.route('/:userId')
    .get(usersCntrl.getUserRoute)
    .put(usersCntrl.updateUserRoute)
    .delete(usersCntrl.deleteUserRoute)


module.exports = userRoute