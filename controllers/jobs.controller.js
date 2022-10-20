const {createAJobServices, getAllJobsServices} = require("../services/jobs.service");

// get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const allJobs = await getAllJobsServices();
        res.status(200).json({status: "success", message: allJobs})
    } catch (e) {
        res.status(400).json({status: "fail", message: e.message})
    }
}

// post a single job controller
exports.createAJob = async (req, res) => {
    try {
        const newJob = await createAJobServices(req?.body)
        res.status(200).json({status: "success", message: newJob})
    } catch (e) {
        res.status(400).json({status: "fail", message: e.message})
    }
}