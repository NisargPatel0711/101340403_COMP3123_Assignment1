const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

/*  Sample Signup Data
    {
        "username" : "nishu11",
        "email" : "nisarg@gmail.com",
        "password" : "nis7"
    }
*/

// sign up api to create new user
router.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const user = await newUser.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({
                status: false,
                message: "User already exists with the same email"
            })
        }
        res.status(400).send(error);
    }
});

/*  Sample Login Data
    {
        "username" : "nishu11",
        "password" : "nis7"
    }
*/

// login api to login for existing users
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userData = await UserModel.findOne({
            username: username,
        });

        if (userData != null && password != null) {
            if (password == userData.password) {
                res.status(201).json({
                    status: true,
                    username: userData.username,
                    message: "User logged in successfully",
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: "Invalid Username and password",
                });
            }
        } else {
            res.status(404).json({
                status: false,
                message:
                    "User Not Found. Please enter correct username & password",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
