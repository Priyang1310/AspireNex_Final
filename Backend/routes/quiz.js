const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz'); // Replace with your Quiz model
const mongoose=require('mongoose')
// Route to add a new quiz
// server/routes/quizRoutes.js

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quizId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: 'Invalid quiz ID format' });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get quiz corresponding to a perticular roll number
router.get('/rollNumber/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const quizzes = await Quiz.find({ rollNumbers: rollNumber });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new quiz
router.post('/', async (req, res) => {
  const { title, questions, rollNumbers } = req.body;

  const quiz = new Quiz({
    title,
    questions,
    rollNumbers, // Add rollNumbers to the new quiz object
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//marks

router.post('/submit', async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    res.status(200).json({ score, total: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a quiz by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete the quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
