const express = require("express")
const {
    createAJob, getAllJobs, getSingleJobById, updateSingleJob
} = require("../controllers/jobs.controller");
const verifyUserAccess = require("../middleware/authorization");
const verifyUserByToken = require("../middleware/verifyUserByToken")
const router = express.Router();

// routers are here
router.route("/").post(verifyUserByToken, verifyUserAccess("admin", "hiring manager"), createAJob).get(getAllJobs);


// get and update job by is router are here
router.route("/:id").get(getSingleJobById).patch(verifyUserByToken, verifyUserAccess("admin", "hiring manager"), updateSingleJob)


module.exports = router;