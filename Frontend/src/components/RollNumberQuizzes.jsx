import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RollNumberQuizzes = () => {
  const { rollNumber } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/rollNumber/${rollNumber}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          toast.error("Failed to fetch quizzes");
        }
      } catch (error) {
        toast.error("Error fetching quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [rollNumber]);

  if (loading) return <p>Loading...</p>;

  if (quizzes.length === 0)
    return <p>No quizzes found for roll number {rollNumber}</p>;

  return (
    <>
      <header className="bg-gray-800 p-4 ">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz App</h1>
        </nav>
      </header>
      <div className="text-white p-4">
        <Toaster />
        <h2 className="text-2xl mb-4">Quizzes for Roll Number {rollNumber}</h2>
        <div className="grid grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
              <Link to={`/quiz/${quiz._id}`}>
                <button className="bg-blue-500 text-white p-2 rounded">
                  View Quiz
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RollNumberQuizzes;
