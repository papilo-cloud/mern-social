const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const compress = require('compression')
const userRoute = require('./routes/users.route')
const authRoute = require('./routes/auth.route')
const uploadRoute = require('./routes/uploads.route')
const tokenAuth = require('./lib/token-auth')
const { byToken } = require('./lib/find-user')

const app = express()

app.use(express.json())
app.use(cors())
app.use(compress())
app.use(cookieParser())
app.use(logger('tiny'))


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/auth', authRoute)
app.use(tokenAuth(byToken))
app.use('/api/users', userRoute)
app.use('/api/upload', uploadRoute)

module.exports = app