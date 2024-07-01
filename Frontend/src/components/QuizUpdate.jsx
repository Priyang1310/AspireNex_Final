import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const QuizUpdate = ({ quizzes, setQuizzes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://aspirenex.onrender.com/api/quizzes/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Error fetching quiz!");
      }
    };

    fetchQuiz();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://aspirenex.onrender.com/api/quizzes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (response.ok) {
        const updatedQuiz = await response.json();
        setQuizzes(
          quizzes.map((q) => (q._id === id ? updatedQuiz : q))
        );
        toast.success("Quiz updated successfully!");
        navigate("/admin");
      } else {
        toast.error("Failed to update quiz!");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Error updating quiz!");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="text-white p-4">
      <Toaster />
      <h2 className="text-2xl mb-4">Update Quiz</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-xl mb-2">Title:</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl mb-2">Questions:</label>
          {/* Here, you can add a more complex UI for editing questions */}
          <textarea
            value={JSON.stringify(quiz.questions, null, 2)}
            onChange={(e) =>
              setQuiz({ ...quiz, questions: JSON.parse(e.target.value) })
            }
            className="w-full p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 p-2 rounded"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizUpdate;
