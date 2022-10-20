const express = require("express")
const verifyUserByToken = require("../middleware/verifyUserByToken")
const router = express.Router();
const {
    registerUserController,
    getSingleUser,
    loginUserController
} = require("../controllers/user.controller")

// routers are here
router.get("/me", verifyUserByToken, getSingleUser)
router.post("/signup", registerUserController)
router.post("/login", loginUserController)

module.exports = router;