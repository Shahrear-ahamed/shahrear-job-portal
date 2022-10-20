const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const jobsSchema = mongoose.Schema({
    title: {
        type: String, trim: true, required: [true, "Please add Job title"]
    }, publishedDate: {
        type: Date
    }, deadLine: {
        type: Date, required: [true, "Please add deadline of this job"]
    }, hiringManager: {
        name: {
            type: String, required: [true, "Please provide hiring manager name"]
        }, hUId: {
            type: ObjectId, ref: "Users"
        }
    }, location: {
        type: String, required: [true, "you have to add job location"], lowercase: true
    }, jobType: {
        type: String, enum: {
            values: ["Remote", "On-site", "Hybrid"], message: "job type is not allow for {VALUE}"
        }
    },
    salary: {
        type: Number,
        required: [true, "Please add salary amount"],
        min: [0, "salary can't be negative"]
    },
    description: {
        type: String,
        required: [true, "Please add your company job description for user interaction"]
    },
    totalOpening: {
        type: Number,
        required: [true, "add total number of opening for this job"],
        min: [0, "Total number of opening can't be 0"]
    },
    perks: [{type: String}],
    contactDetails: {
        type: String,
        required: [true, "Please provide your contact details for job apply"]
    }
}, {
    timestamps: true,
})

const Jobs = mongoose.model("Jobs", jobsSchema)

module.exports = Jobs