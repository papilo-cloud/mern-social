const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compress = require('compression')
const userRoute = require('./routes/users.route')

const app = express()

app.use(express.json())
app.use(cors())
app.use(compress())
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/users', userRoute)

module.exports = app