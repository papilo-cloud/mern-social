const upload = require('../controller/upload.controller')
const uploadRoute = require('express').Router()

uploadRoute.post('/', upload.single('file'), (req, res) => {
    res.status(200).json({
        message: 'file has been uploaded'
    })
})

module.exports = uploadRoute