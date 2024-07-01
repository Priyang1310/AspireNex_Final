// server/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      options: [String],
      correctAnswer: Number,
    },
  ],
  rollNumbers: [String], // Add this line to store roll numbers
});

module.exports = mongoose.model('Quiz', quizSchema);
