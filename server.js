const express = require("express");
const morgan = require("morgan");
const { Students } = require("../models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/health-check", (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Application is running smoothly. Health check passed!",
      isSuccess: true,
    });
  } catch {
    res.status(500).json({
      status: "Fail",
      message: "Application is error. Health check failed!",
      isSuccess: false,
    });
  }
});

app.get("/api/v1/students", async (req, res) => {
  try {
    const students = await Students.findAll();
    res.status(200).json({
      status: "Success",
      message: "Students data retrieved successfully.",
      isSuccess: true,
      data: {
        students,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve students data.",
      isSuccess: false,
      error: error.message,
    });
  }
});

app.post("/api/v1/students", async (req, res) => {
  const newStudent = req.body;

  try {
    const createdStudent = await Students.create(newStudent);
    res.status(201).json({
      status: "Success",
      message: "New student created successfully.",
      isSuccess: true,
      data: {
        student: createdStudent,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to create new student.",
      isSuccess: false,
      error: error.message,
    });
  }
});

module.exports = app;
