require('dotenv').config()

const config = {
    mongodbUri: process.env.MONGODBURL,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = config