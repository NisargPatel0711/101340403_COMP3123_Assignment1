const mongoose = require("mongoose");

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
