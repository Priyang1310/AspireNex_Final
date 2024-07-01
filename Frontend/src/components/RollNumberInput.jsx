import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RollNumberInput = () => {
  const [rollNumber, setRollNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rollNumber) {
      navigate(`/quizzes/${rollNumber}`);
    } else {
      toast.error("Please enter a valid roll number");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="mb-4 p-2 border rounded w-full bg-gray-900 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RollNumberInput;
