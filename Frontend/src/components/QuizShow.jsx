// src/components/QuizShow.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizShow = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/${id}`,
          { method: "GET" }
        ); // Adjust the URL if needed
        const data = await response.json();
        console.log("data : ", data);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    console.log(quiz);

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <header className="bg-gray-800 p-4 ">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz App</h1>
        </nav>

      </header>
      <div className="flex max-w-full items-center justify-center overflow-hidden ">
        <div className="w-[40rem] text-white mt-5 p-4 rounded bg-gray-800 overflow-y-scroll h-[38rem]">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{quiz.title}</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-400 sm:text-4xl indent-3 text-2xl">
                {index + 1}) {q.text}
              </p>
              <ul className="ml-4 indent-14">
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    className={
                      q.correctAnswer === optIndex
                        ? "text-green-500 sm:text-2xl text:xl"
                        : "text-gray-300 sm:text-2xl text:xl"
                    }
                  >
                    ⁕{option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizShow;
