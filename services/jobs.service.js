const JobApply = require("../models/JobApply");
const Jobs = require("../models/Jobs");

// get all jobs
exports.getAllJobsServices = async (filter, queries) => {
  const jobs = await Jobs.find(filter)
    .sort(queries?.sort)
    .skip(queries?.skip)
    .limit(queries?.limit);

  const totalJobs = await Jobs.countDocuments(filter);
  const page = Math.ceil(totalJobs / (queries?.limit || 10));
  return { totalJobs, page, jobs };
};

// get single job by id
exports.getSingleJobByIdService = async (jobId) => {
  const singleJob = await Jobs.findOne({ _id: jobId }).populate({
    path: "hiringManager.hUId",
    select: "-password -updatedAt -createdAt -status -__v",
  });
  return singleJob;
};

// post a new job
exports.createAJobServices = async (jobData) => {
  const createdJob = await Jobs.create(jobData);

  // add job applierData
  const { _id, publishedDate, title, deadLine } = createdJob || {};
  const applyInfo = {
    jobPublishDate: publishedDate,
    jobDeadline: deadLine,
    jobDetails: {
      jobTitle: title,
      jobId: _id,
    },
    appliers: [],
  };

  // add to it in database
  const addToApplier = await JobApply.create(applyInfo);
  return { createdJob, addToApplier };
};

// update a job by id
exports.updateAJobByIdServices = async (jobId, updateData) => {
  const updateResult = await Jobs.updateOne(
    { _id: jobId },
    { $set: updateData },
    { runValidators: true }
  );
  return updateResult;
};

exports.applyAJobByIdService = async (jobId, applyData) => {
  const result = await JobApply.updateOne(
    { "jobDetails.jobId": jobId },
    { $push: { appliers: applyData } },
    { runValidators: true }
  );
  return result;
};

exports.checkIsApplyThisJob = async (jobId) => {
  const result = JobApply.findOne({ "jobDetails.jobId": jobId });
  return result;
};
