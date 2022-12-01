const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const employeeRoute = require("./routes/employeeRoutes");
const userRoute = require("./routes/userRoutes");
const cors = require('cors')

const DB_URL = process.env.DB_URL ||
    "mongodb+srv://nisarg0711:nishu@cluster0.c6toxmm.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";
const PORT_NUMBER = process.env.PORT || 8081;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(
            "Successfully connected to the database mongoDB Atlas Server"
        );
    })
    .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

app.use("/api/emp", employeeRoute);
app.use("/api/user", userRoute)

app.route("/").get((req, res) => {
    res.send(
        "<h1>Welcome to Assignment-01 of COMP3123</h1> <h1>Open Postman to test API</h1>"
    );
});

app.listen(PORT_NUMBER, () => {
    console.log(
        `Server is listening on port ${PORT_NUMBER}\n` +
            `Visit https://localhost:${PORT_NUMBER} on your browser.`
    );
});
