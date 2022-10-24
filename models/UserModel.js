const mongoose = require("mongoose");

// email validation format
const validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

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
        unique: true,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
    },
});

module.exports = mongoose.model("users", userSchema);
