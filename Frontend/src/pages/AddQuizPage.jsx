import React from "react";
import QuizForm from "../components/QuizForm";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const AddQuizPage = () => {
  const handleSubmit = async (quiz) => {
    try {
      const response = await fetch("https://aspirenex.onrender.com/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error("Failed to add quiz");
      }

      const data = await response.json();
      console.log("Quiz added:", data);
      toast.success("Quiz added successfully!");
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error("Failed to add quiz");
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <header>
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz App</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin" className="hover:text-gray-300">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex justify-center items-center h-screen">
        <Toaster />
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Quiz</h2>
          <QuizForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default AddQuizPage;
