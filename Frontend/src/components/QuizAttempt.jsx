import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const QuizAttempt = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quizzes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuiz(data);
          setAnswers(Array(data.questions.length).fill(null));
        } else {
          toast.error('Failed to fetch quiz');
        }
      } catch (error) {
        toast.error('Error fetching quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleFeedback = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Excellent job!';
    if (percentage >= 75) return 'Great work!';
    if (percentage >= 50) return 'Good effort!';
    return 'Needs improvement.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/quizzes/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId: id, answers }),
      });
      if (response.ok) {
        const result = await response.json();
        setScore(result.score);
        setFeedback(handleFeedback(result.score, quiz.questions.length));
      } else {
        toast.error('Failed to submit quiz');
      }
    } catch (error) {
      toast.error('Error submitting quiz');
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-4 h-[41rem] overflow-y-scroll">
      <Toaster />
      {score !== null ? (
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Your Score</h2>
          <p className="text-2xl mb-2">
            You scored <span className="text-green-400">{score}</span> out of{' '}
            <span className="text-green-400">{quiz.questions.length}</span>
          </p>
          {feedback && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              <h3 className="text-xl font-bold mb-2">Feedback</h3>
              <p>{feedback}</p>
            </div>
          )}
          <div className="mt-4 ">
            <h3 className="text-xl font-bold mb-2">Correct Answers</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg font-semibold mb-1">{question.text}</p>
                <ul className="ml-4">
                  {question.options.map((option, optIndex) => (
                    <li
                      key={optIndex}
                      className={
                        question.correctAnswer === optIndex
                          ? "text-green-500"
                          : "text-gray-300"
                      }
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white p-2 rounded mt-4 transition duration-300 hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-4 rounded shadow-lg h-[39rem] overflow-y-scroll"
        >
          <h2 className="text-3xl font-bold mb-4">{quiz.title}</h2>
          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-semibold mb-2">{question.text}</p>
              {question.options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className="block mb-2 p-2 bg-gray-700 rounded cursor-pointer transition duration-300 hover:bg-gray-600"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optIndex}
                    onChange={() => {
                      const updatedAnswers = [...answers];
                      updatedAnswers[index] = optIndex;
                      setAnswers(updatedAnswers);
                    }}
                    className="mr-2"
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded mt-4 transition duration-300 hover:bg-green-600"
          >
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizAttempt;
