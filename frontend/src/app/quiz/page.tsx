"use client";

import Quiz, { IQuiz } from "@/components/quiz";
import axios from "axios";
import { useEffect, useState } from "react";

const QuizPage: React.FC = () => {
  const [quizs, setQuizs] = useState<IQuiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/quiz/quiz.json");
        setQuizs(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pb-12 mt-4">
      {quizs.map((quiz) => (
        <Quiz key={quiz.problemNo} {...quiz} />
      ))}
    </div>
  );
};

export default QuizPage;
