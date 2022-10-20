const {
    createAJobServices, getAllJobsServices, getSingleJobByIdService, updateAJobByIdServices
} = require("../services/jobs.service");

// get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const allJobs = await getAllJobsServices();
        res.status(200).json({status: "success", message: allJobs})
    } catch (e) {
        res.status(400).json({status: "fail", message: e.message})
    }
}

// get single job by id
exports.getSingleJobById = async (req, res) => {
    try {
        const {id} = req?.params;
        const newJob = await getSingleJobByIdService(id);

        res.status(200).json({status: "success", message: newJob});
    } catch (e) {
        res.status(400).json({status: "fail", message: e.message});
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

// update a single job by id
exports.updateSingleJob = async (req, res) => {
    try {
        const {id} = req?.params;
        const updatedData = await updateAJobByIdServices(id, req?.body)

        if (!updatedData?.modifiedCount) {
            res.status(400).json({status: "fail", message: "update failed and can't update data"})
        }

        res.status(200).json({status: "success", message: updatedData})
    } catch (e) {
        res.status(400).json({status: "fail", message: "Failed to find your job and update to it"})
    }
}