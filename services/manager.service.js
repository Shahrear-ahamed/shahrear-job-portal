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
  const appliedUser = await JobApply.findOne({ "jobDetails.jobId": id })
    .select("appliers -_id")
    .populate({ path: "appliers.candidateId" });
  const applied = appliedUser?.appliers;
  const totalApplied = appliedUser?.appliers?.length;
  return { totalApplied, singleJob, applied };
};
