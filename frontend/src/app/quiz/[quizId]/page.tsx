"use client";

import Quiz, { IQuiz } from "@/components/quiz/Quiz";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const QuizPage: React.FC = () => {
  const [quizs, setQuizs] = useState<IQuiz[]>([]);

  const pathname = usePathname();

  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const quizId = parseInt(lastPath);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/v0/quiz/${quizId}`);
        setQuizs(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16">
      {quizs.map((quiz) => (
        <Quiz key={quiz.problemNo} {...quiz} />
      ))}
    </div>
  );
};

export default QuizPage;
