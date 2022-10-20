const Users = require("../models/Users")

// create user service
exports.registerUserServices = async (data) => {
    return await Users.create(data)
}
