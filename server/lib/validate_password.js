const validate = (req, res, next) => {
    const password = req.body.password
    if (password && password.length < 6) {
        return res.status(406).json({
            error: 'Password must be at least 6 characters.'
        })
    } else {
        next()
    }
}

module.exports = validate