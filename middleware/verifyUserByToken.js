const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")?.[1];

    if (!token) {
        return res.status(403).json({status: "fail", error: "token are not provided"})
    }

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).json({status: "fail", error: err?.message})
        } else {
            req.user = decoded;
            next()
        }
    });

}