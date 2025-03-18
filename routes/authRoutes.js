const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/questions", authController.getQuestions);
router.post("/answers/attempt", authController.attemptQuestions);
router.post("/register", authController.registerUser);

module.exports = router;
