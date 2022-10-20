const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "userName must be unique"],
        minLength: [0, "Name" + " length more then 0"]
    }, email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    }, password: {
        type: String, required: [true, "Password is required"], validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 6, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1,
            }), message: "Your password is not strong",
        },
    }, role: {
        type: String, enum: ["Candidate", "Hiring Manager", "Admin"], default: "Candidate",
    }, firstName: {
        type: String,
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    }, lastName: {
        type: String,
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    }, contactNumber: {
        type: String, validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    }, imageURL: {
        type: String, validate: [validator.isURL, "Please provide a valid url"],
    }, skills: {
        type: String, minLength: [0, "your skills must be add"]
    }, status: {
        type: String, default: "inactive", enum: ["active", "inactive", "blocked"],
    },

    confirmToken: String, confirmTokenExpires: Date,

    passwordChangedAt: Date, passwordResetToken: String, passwordResetExpires: Date,
}, {timestamps: true});

usersSchema.pre("save", async function (next) {
    try {
        const userPassword = this.password;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        this.password = hashedPassword
        next()
    } catch (e) {
        next(e);
    }
});

usersSchema.methods.checkPassword = function (password, hash) {
    return bcrypt.compare(password, hash);
}

const Users = mongoose.model("Users", usersSchema);
module.exports = Users