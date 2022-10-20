const Jobs = require("../models/Jobs")

// get all jobs
exports.getAllJobsServices = async () => {
    const jobs = await Jobs.find({});

    const totalJobs = await Jobs.countDocuments();
    return {totalJobs, jobs}
}

// get single job by id
exports.getSingleJobByIdService = async (jobId) => {
    const singleJob = await Jobs.findOne({_id: jobId}).populate("hiringManager.hUId")
    return singleJob
}

// post a new job
exports.createAJobServices = async jobData => {
    return await Jobs.create(jobData)
}

// update a job by id
exports.updateAJobByIdServices = async (jobId, updateData) => {
    const updateResult = await Jobs.updateOne({_id: jobId}, {$set: updateData}, {runValidators: true})
    return updateResult;
}