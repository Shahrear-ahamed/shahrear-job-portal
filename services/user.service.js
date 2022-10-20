const Users = require("../models/Users")

// create user service
exports.registerUserServices = async (data) => {
    return await Users.create(data)
}

exports.loginUserServices = async (email) => {
    const loginUser = await Users.findOne({email})
    return loginUser
}

exports.getSingleUserServices = async (email) => {
    const userDetails = await Users?.findOne({email});
    const {password, ...user} = userDetails.toObject()
    return user
}