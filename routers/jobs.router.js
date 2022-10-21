const express = require("express");
const {
  createAJob,
  getAllJobs,
  getSingleJobById,
  updateSingleJob,
  applyAJob,
} = require("../controllers/jobs.controller");
const verifyUserAccess = require("../middleware/authorization");
const verifyUserByToken = require("../middleware/verifyUserByToken");
const router = express.Router();

// routers are here
router
  .route("/")
  .post(
    verifyUserByToken,
    verifyUserAccess("hiring manager"),
    createAJob
  )
  .get(getAllJobs);

// post or apply for a job
router.post("/:id/apply", verifyUserByToken, applyAJob);

// get and update job by is router are here
router
  .route("/:id")
  .get(getSingleJobById)
  .patch(
    verifyUserByToken,
    verifyUserAccess("hiring manager"),
    updateSingleJob
  );

module.exports = router;
