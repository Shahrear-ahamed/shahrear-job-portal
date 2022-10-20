const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  const payload = {
    id: userInfo?._id,
    email: userInfo?.email,
    role: userInfo?.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7days",
  });
  return token;
};

module.exports = generateToken;
