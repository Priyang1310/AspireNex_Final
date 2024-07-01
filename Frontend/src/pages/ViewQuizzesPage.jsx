import React, { useEffect, useState } from "react";
import QuizList from "../components/QuizList";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quizzes"); // Endpoint for fetching quizzes
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <header className="bg-gray-800 p-4 ">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz App</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/admin/add" className="hover:text-gray-300">
                Add Quiz
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center ">All Quizzes</h2>
        <QuizList quizzes={quizzes} setQuizzes={setQuizzes} />
      </div>
    </div>
    </>
  );
};

export default ViewQuizzesPage;
