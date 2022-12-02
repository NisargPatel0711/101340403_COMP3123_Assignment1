const mongoose = require("mongoose");

// User Schema Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 100,
    },
    email: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
    },
});

module.exports = mongoose.model("users", userSchema);
