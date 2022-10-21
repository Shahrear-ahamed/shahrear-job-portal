const express = require("express");
const router = express.Router();
const {
  getAllJobsForHManagerById,
  getASingleJobDetailsById,
} = require("../controllers/manager.controller");
const verifyUserAccess = require("../middleware/authorization");
const verifyUserByToken = require("../middleware/verifyUserByToken");

// routers are here
router.get(
  "/",
  verifyUserByToken,
  verifyUserAccess("admin", "hiring manager"),
  getAllJobsForHManagerById
);

router.get(
  "/:id",
  verifyUserByToken,
  verifyUserAccess("admin", "hiring manager"),
  getASingleJobDetailsById
);

module.exports = router;
