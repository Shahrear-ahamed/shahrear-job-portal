const Jobs = require("../models/Jobs")

// get all jobs
exports.getAllJobsServices = async () => {
    const jobs = await Jobs.find({});

    const totalJobs = await Jobs.countDocuments();
    return {totalJobs, jobs}
}

// post a new job
exports.createAJobServices = async jobData => {
    return await Jobs.create(jobData)
}