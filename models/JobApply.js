const mongoose = require("mongoose");
const validator = require("validator")
const {ObjectId} = mongoose.Schema.Types;

const jobApplySchema = mongoose.Schema({
    jobDetails: {
        jobTitle: {
            type: String,
        }, jobId: {
            type: ObjectId
        }
    }, applier: [{
        candidateName: String,
        candidateEmail: {type: String, validate: [validator.isEmail, "your email is not valid"]},
        candidateId: {type: ObjectId, ref: "users"}
    }]
}, {
    timestamps: true,
})

const JobApply = mongoose.model("JobApply", jobApplySchema)
module.exports = JobApply;