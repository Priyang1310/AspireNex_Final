// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddQuizPage from "./pages/AddQuizPage";
import ViewQuizzesPage from "./pages/ViewQuizzesPage";
import QuizShow from "./components/QuizShow";
import RollNumberInput from "./components/RollNumberInput";
import RollNumberQuizzes from "./components/RollNumberQuizzes";
import QuizAttempt from "./components/QuizAttempt";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full fixed bg-gray-900 text-white">
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="*" element={<ViewQuizzesPage />} />
            <Route path="/" element={<RollNumberInput />} />
            <Route
              path="/quizzes/:rollNumber"
              element={<RollNumberQuizzes />}
            />
            <Route path="/quiz/:id" element={<QuizAttempt />} />
            <Route path="/admin/quiz/:id" element={<QuizShow />} />
            <Route path="/admin/add" element={<AddQuizPage />} />
            <Route path="/admin/" element={<ViewQuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizShow />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
