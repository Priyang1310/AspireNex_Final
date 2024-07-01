const Quiz = require("../models/quiz");

exports.add_quiz = async (req, res) => {
  console.log(req.body);
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(200).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
