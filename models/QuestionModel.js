const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  order: { type: Number, required: true, unique: true }, 
  question: { type: String, required: true }, 
  options: { type: [String], required: true }, 
  correct_answer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema);
