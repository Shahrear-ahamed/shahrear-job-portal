const generateToken = require("../utils/jwt")
const {
    registerUserServices,
    loginUserServices,
    getSingleUserServices
} = require("../services/user.service");

// get a user
exports.getSingleUser = async (req, res) => {
    try {
        const myDetails = await getSingleUserServices(req?.user?.email)
        res.status(200).json({status: "success", message: myDetails})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}

// register a user
exports.registerUserController = async (req, res) => {
    try {
        const result = await registerUserServices(req?.body);
        const {password, ...userResult} = result.toObject();

        // generate a token for user
        const token = await generateToken(userResult);
        res.status(200).json({status: "success", message: userResult, token})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}

// login a user
exports.loginUserController = async (req, res) => {
    try {
        const {email, password} = req?.body;
        if (!email || !password) {
            res.status(400).json({status: "fail", error: "please provide email and password"})
        }
        const loginResult = await loginUserServices(email);

        if (!loginResult?.email) {
            res.status(403).json({status: "fail", error: "can't find user"})
        }

        const verify = await loginResult.checkPassword(password, loginResult?.password)

        if (!verify) {
            res.status(403).json({status: "unauthorized", error: "email or password is wrong"})
        }

        // generate a token every login
        const token = await generateToken(loginResult);
        const {password: pWord, ...user} = loginResult.toObject();

        res.status(200).json({status: "success", result: user, token})
    } catch (e) {
        res.status(400).json({status: "fail", error: e.message})
    }
}