const mongoose = require("mongoose")
const validator = require("validator")

const usersSchema = mongoose.Schema({
    name: {
        type: String, trim: true, unique: [true, "userName must be unique"], minLength: [0, "Name" +
        " length more then 0"]
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
                minLength: 6, minLowercase: 3, minNumbers: 1, minUppercase: 1, minSymbols: 1,
            }), message: "Password {VALUE} is not strong enough.",
        },
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
    },
    skills: {
        type: String,
        minLength: [0, "your skills must be add"]
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive", "blocked"],
    },

    confirmToken: String,
    confirmTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {timestamps: true});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users