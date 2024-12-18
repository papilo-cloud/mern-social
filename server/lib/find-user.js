const User = require("../models/user.model");

let findUserByToken = async ({userId}) =>
    await User.findById(userId)

exports.byToken = findUserByToken