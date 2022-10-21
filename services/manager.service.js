const JobApply = require("../models/JobApply");
const Jobs = require("../models/Jobs");

exports.getAllJobsForHManagerByIdServices = async (id) => {
  const managerData = await Jobs.find({ "hiringManager.hUId": id }).select(
    "-hiringManager -createdAt -updatedAt -__v"
  );
  const totalJobs = await Jobs.countDocuments({ "hiringManager.hUId": id });
  return { totalJobs, managerData };
};

exports.getSingleJobForManagerByIsDetails = async (id) => {
  const singleJob = await Jobs.findOne({ _id: id });
  const allAppliers = await JobApply.findOne({
    "jobDetails.jobId": id,
  })
    .populate("appliers.candidateId", "-password -updatedAt -createdAt -__v")
    .select("appliers -_id");
  const appliedUsers = allAppliers?.appliers;
  return { singleJob, appliedUsers };
};
