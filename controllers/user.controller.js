const generateToken = require("../utils/jwt")

// get a user
const {registerUserServices} = require("../services/user.service");
exports.getSingleUser = async (req, res) => {
    try {
        console.log("get user")
        res.status(200).json({status: "success", message: "this is a user, get successfully"})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}

// register a user
exports.registerUserController = async (req, res) => {
    try {
        const result = await registerUserServices(req?.body);
        const token = await generateToken(result);
        res.status(200).json({status: "success", message: token})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}

// login a user
exports.loginUserController = async (req, res) => {
    try {
        console.log("Hi")
        res.status(200).json({status: "success", message: "created successfully"})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}