const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/EmployeeModel");

// POST api to create new employee
router.post("/employees", async (req, res) => {
    try {
        const newEmployee = new EmployeeModel(req.body);
        const employee = await newEmployee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }

    // Employee Object format example
    // {
    //     "first_name": "Nisarg",
    //     "last_name": "Patel",
    //     "email": "nisarg@gmail.com",
    //     "gender": "Male",
    //     "salary": 12546.25
    // }
});

// GET api to retrieve all the employees from db
router.get("/employees", async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET api to retrieve specific employee from the db by passing employee id
router.get("/employees/:eid", async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.eid, req.body);
        if (!employee)
            return res.status(404).json({
                status: false,
                message: "No Employee Found",
            });
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT api to update employee details by passing id at url and data at body
router.put("/employees/:eid", async (req, res) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            req.params.eid,
            req.body
        );
        if (!updatedEmployee)
            return res.status(404).json({
                status: false,
                message: "No Employee Found",
            });
        const employee = await updatedEmployee.save();
        res.status(200).json({
            status: true,
            message: `${req.params.eid} Updated successfully`,
            updatedEmployee: employee,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE api to delete the employee by passing id
router.delete("/employees", async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(
            req.query.eid,
            req.body
        );
        if (!employee)
            return res.status(404).json({
                status: false,
                message: "No Employee Found",
            });
        res.status(204).json({
            status: true,
            message: `${req.query.eid} Deleted Successfully`,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
