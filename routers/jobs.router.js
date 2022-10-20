const express = require("express")
const {createAJob, getAllJobs} = require("../controllers/jobs.controller");
const verifyUserAccess = require("../middleware/authorization");
const verifyUserByToken = require("../middleware/verifyUserByToken")
const router = express.Router();

// routers are here
router.route("/").post(verifyUserByToken, verifyUserAccess("admin", "hiring manager"), createAJob).get(getAllJobs)


module.exports = router;