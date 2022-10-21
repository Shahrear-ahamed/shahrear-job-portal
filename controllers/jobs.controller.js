const {
  createAJobServices,
  getAllJobsServices,
  getSingleJobByIdService,
  updateAJobByIdServices,
  applyAJobByIdService,
} = require("../services/jobs.service");

// get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const query = req?.query;
    const filter = { ...query };

    const excludeItems = ["sort", "limit", "page"];

    // clean sort items
    excludeItems.forEach((item) => delete filter[item]);

    const queries = {};
    if (query?.sort) {
      const sorts = query?.sort?.split(",").join(" ");
      queries.sort = sorts;
    }
    if (query?.page) {
      const { page = 1, limit = 10 } = query;
      queries.skip = (page - 1) * Number(limit);
      queries.limit = limit;
    }

    // search are here
    const allJobs = await getAllJobsServices(filter, queries);

    // send user zero data response
    if (allJobs?.jobs) {
      return res.status(200).json({
        status: "success",
        message: "No jobs found with this searches",
      });
    }

    res.status(200).json({ status: "success", allJobs });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// get single job by id
exports.getSingleJobById = async (req, res) => {
  try {
    const { id } = req?.params;
    const newJob = await getSingleJobByIdService(id);

    res.status(200).json({ status: "success", message: newJob });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// post a single job controller
exports.createAJob = async (req, res) => {
  try {
    const newJob = await createAJobServices(req?.body);
    res.status(200).json({ status: "success", message: newJob });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// update a single job by id
exports.updateSingleJob = async (req, res) => {
  try {
    const { id } = req?.params;
    const updatedData = await updateAJobByIdServices(id, req?.body);

    if (!updatedData?.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "update failed and can't update data",
      });
    }

    res.status(200).json({ status: "success", message: updatedData });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Failed to find your job and update to it",
    });
  }
};

// apply for a job
exports.applyAJob = async (req, res) => {
  try {
    const { id } = req?.params;
    const applyJob = await applyAJobByIdService(id, req?.body);

    res.status(200).json({ status: "success", message: applyJob });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
