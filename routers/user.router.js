const express = require("express")
const router = express.Router();
const {
    registerUserController,
    getSingleUser,
    loginUserController
} = require("../controllers/user.controller")

// routers are here
router.get("/me", getSingleUser)
router.post("/signup", registerUserController)
router.post("/login", loginUserController)

module.exports = router;