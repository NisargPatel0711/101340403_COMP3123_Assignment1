const mongoose = require("mongoose");

// email validation format
const validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// Employee Schema Model
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        trim: true,
        lowercase: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        maxLength: 25,
    },
    salary: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("employees", employeeSchema);
