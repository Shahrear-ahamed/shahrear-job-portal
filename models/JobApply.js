const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobApplySchema = mongoose.Schema(
  {
    jobPublishDate: Date,
    jobDeadline: Date,
    jobDetails: {
      jobTitle: {
        type: String,
      },
      jobId: {
        type: ObjectId,
        ref: "jobs",
      },
    },
    appliers: [
      {
        candidateName: String,
        applyDate: Date,
        candidateEmail: {
          type: String,
          validate: [validator.isEmail, "your email is not valid"],
        },
        candidateId: { type: ObjectId, ref: "users" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const JobApply = mongoose.model("JobApply", jobApplySchema);
module.exports = JobApply;
