const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const AttemptedModel = require("../models/AttemptedQustionModel");

const fs = require("fs");
const path = require("path");

// GET Questions API
exports.getQuestions = async (req, res) => {
  try {
    // Reading the JSON file
    const filePath = path.join(__dirname, "../utils/Question.json");
    const data = fs.readFileSync(filePath, "utf-8");

    const questions = JSON.parse(data);

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate name and email
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new user
    const user = new UserModel({
      name: name.trim(),
      email: email.trim(),
    });

    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiry time
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.attemptQuestions = async (req, res) => {
  try {
    const { name, question, answer } = req.body;

    // Validate name and email
    if (!name) {
      return res.status(400).json({ message: "Name are required" });
    }

    // Create new user
    const answered = new AttemptedModel({
      name: name,
      question: question,
      answer: answer,
    });

    await answered.save();

    res.status(201).json({
      message: "User attempted quaestion successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
