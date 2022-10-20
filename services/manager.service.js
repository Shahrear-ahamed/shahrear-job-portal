const Jobs = require("../models/Jobs");

exports.getAllJobsForHManagerByIdServices = async (id) => {
  const managerData = await Jobs.find({ "hiringManager.hUId": id }).select(
    "-hiringManager -createdAt -updatedAt -__v"
  );
  const totalJobs = await Jobs.countDocuments({ "hiringManager.hUId": id });
  return { totalJobs, managerData };
};

exports.getSingleJobForManagerByIsDetails = async (id) => {
  const singleJob = await Jobs.find({ _id: id });
  return singleJob;
};
