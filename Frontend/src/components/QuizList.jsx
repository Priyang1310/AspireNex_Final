import React from "react";
import QuizShow from "./QuizShow";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const QuizList = ({ quizzes, setQuizzes }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
        toast.success("Quiz deleted successfully!");
      } else {
        toast.error("Failed to delete quiz!");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Error deleting quiz!");
    }
  };

  return (
    <div className="text-white h-[35rem] w-full overflow-hidden overflow-y-scroll p-4 rounded px-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <Toaster />
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="mb-4 w-full flex flex-col justify-between sm:p-2 py-1 p-2 h-[10rem] sm:h-[14rem] md:h-[15rem] bg-gray-800 relative"
        >
          <Routes>
            <Route path="/admin/quiz/:id" element={<QuizShow quiz={quiz} />} />
          </Routes>
          <div className="flex flex-col items-left justify-between">
            <h3 className="sm:text-4xl text-2xl font-bold mb-2">{quiz.title}</h3>
            <p className="sm:text-xl text-sm">
              No. of questions : {quiz.questions.length}
            </p>
          </div>
          <div className="flex bottom-2 right-5 justify-between items-center">
            <div className="flex right-5 top-1 justify-center items-center gap-3">
              <Link to={`/admin/quiz/${quiz._id}`}>
                <button className="ml-2 h-[2.5rem] bg-blue-500 sm:px-3 px-2.5 rounded">
                  View
                </button>
              </Link>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="ml-2 h-[2.5rem] bg-red-500 rounded sm:px-3 px-2.5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
