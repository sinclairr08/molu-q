"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IQuizId {
  quizId: number;
  quizDescription: string;
}

const QuizIdBlock = ({ quizId, quizDescription }: IQuizId) => {
  return (
    <Link href={`/quiz/${quizId}`}>
      <div className="flex flex-col justify-center items-center border-cyan-400 border-2 rounded-full p-3 m-2 whitespace-nowrap overflow-hidden text-sm">
        {quizDescription}
      </div>
    </Link>
  );
};

const QuizIdPage: React.FC = () => {
  const [quizIds, setQuizIds] = useState<IQuizId[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/v0/quiz");
        setQuizIds(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {quizIds.map((quizId) => (
        <QuizIdBlock key={quizId.quizId} {...quizId} />
      ))}
    </div>
  );
};

export default QuizIdPage;
