const {
  getAllJobsForHManagerByIdServices,
  getSingleJobForManagerByIsDetails,
} = require("../services/manager.service");

// get all jobs for a single hiring manager by his id
exports.getAllJobsForHManagerById = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const hiringManagerData = await getAllJobsForHManagerByIdServices(userId);
    res.status(200).json({ status: "success", message: hiringManagerData });
  } catch (e) {
    res.status(400).json({ status: "fail", error: e.message });
  }
};

// get a single job details by manager id
exports.getASingleJobDetailsById = async (req, res) => {
  try {
    const { id } = req?.params;
    const hiringManagerData = await getSingleJobForManagerByIsDetails(id);
    res.status(200).json({ status: "success", message: hiringManagerData });
  } catch (e) {
    res.status(400).json({ status: "fail", error: e.message });
  }
};
