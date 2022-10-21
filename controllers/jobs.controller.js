const {
  createAJobServices,
  getAllJobsServices,
  getSingleJobByIdService,
  updateAJobByIdServices,
  applyAJobByIdService,
  checkIsApplyThisJob,
} = require("../services/jobs.service");
const checkValidateDate = require("../utils/checkValidateDate");

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
    const { id: userId } = req?.user;
    const appliedJob = await checkIsApplyThisJob(id);

    // check is deadline over or not
    const deadLineIs = appliedJob?.jobDeadline;

    const isDeadlineFinish = checkValidateDate(deadLineIs);
    if (!isDeadlineFinish) {
      return res.status(400).json({
        status: "fail",
        message: "Apply date is finished, you can't apply for this job",
      });
    }

    // check is user has or not
    const applierUsers = appliedJob?.appliers;
    const isUser = applierUsers.find((user) => user?.candidateId == userId);

    if (isUser) {
      return res.status(400).json({
        status: "fail",
        message: "You already applied for this job",
      });
    }

    // if user don't apply in this job of deadline isn't over so we can access to apply this job
    const applyJob = await applyAJobByIdService(id, req?.body);

    res.status(200).json({ status: "success", message: applyJob });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
