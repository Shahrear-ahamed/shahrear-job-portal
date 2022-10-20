const jwt = require("jsonwebtoken")

const generateToken = (userInfo) => {
    const payload = {
        name: userInfo?.name,
        email: userInfo?.email,
        role: userInfo?.role
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "7days"})
    return token
}

module.exports = generateToken