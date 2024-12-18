const authRoute = require('express').Router()
const authCntrl = require('../controller/auth.controller')
const validate = require('../lib/validate_password')

authRoute.route('/register')
    .post(validate, authCntrl.createUserRoute)
authRoute.route('/signin')
    .post(authCntrl.signin)
authRoute.route('/signout')
    .get(authCntrl.signout)


module.exports = authRoute