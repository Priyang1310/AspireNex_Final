import React, { useState } from 'react';

const QuizForm = ({ onSubmit }) => {
  const [quiz, setQuiz] = useState({ title: '', questions: [], rollNumbers: '' });

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { text: '', options: ['', '', '', ''], correctAnswer: 0, answer: '' }
      ]
    });
  };

  const handleInputChange = (e, index, field) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = e.target.value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRollNumbersChange = (e) => {
    setQuiz({ ...quiz, rollNumbers: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rollNumberArray = quiz.rollNumbers.split(',').map(rollNumber => rollNumber.trim());
    onSubmit({ ...quiz, rollNumbers: rollNumberArray });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 h-[25rem] overflow-hidden overflow-y-scroll text-white p-4 rounded">
      <input
        type="text"
        placeholder="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        className="mb-2 p-2 border rounded w-full bg-gray-900 text-white"
      />
      {quiz.questions.map((q, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Question Text"
            value={q.text}
            onChange={(e) => handleInputChange(e, index, 'text')}
            className="mb-1 p-2 border rounded w-full bg-gray-900 text-white"
          />
          {q.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) => {
                const options = [...q.options];
                options[optIndex] = e.target.value;
                handleInputChange({ target: { value: options } }, index, 'options');
              }}
              className="mb-1 p-2 border rounded w-full bg-gray-900 text-white"
            />
          ))}
          <label className="text-gray-400">Correct Answer:</label>
          <select
            value={q.correctAnswer}
            onChange={(e) => handleInputChange(e, index, 'correctAnswer')}
            className="mb-1 p-2 border rounded w-full bg-gray-900 text-white"
          >
            {q.options.map((option, optIndex) => (
              <option key={optIndex} value={optIndex}>
                {optIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion} className="bg-blue-500 text-white p-2 rounded">
        Add Question
      </button>
      <label className="block mb-2">Allowed Roll Numbers (comma-separated):</label>
      <input
        type="text"
        value={quiz.rollNumbers}
        onChange={handleRollNumbersChange}
        className="mb-2 p-2 border rounded w-full bg-gray-900 text-white"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">
        Submit Quiz
      </button>
    </form>
  );
};

export default QuizForm;
