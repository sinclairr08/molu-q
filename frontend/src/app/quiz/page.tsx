"use client";

import { AddButtonLink } from "@/components/general/general";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IQuizSet {
  quizSetId: number;
  quizSetDescription: string;
}

const QuizIdBlock = ({ quizSetId, quizSetDescription }: IQuizSet) => {
  return (
    <Link href={`/quiz/${quizSetId}`}>
      <div className="flex flex-col justify-center items-center border-cyan-400 border-2 rounded-full p-3 m-2 whitespace-nowrap overflow-hidden text-sm">
        {quizSetDescription}
      </div>
    </Link>
  );
};

const QuizIdPage: React.FC = () => {
  const [quizSets, setQuizSets] = useState<IQuizSet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/v0/quiz/sets");
        setQuizSets(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {quizSets.map((quizSet) => (
          <QuizIdBlock key={quizSet.quizSetId} {...quizSet} />
        ))}
      </div>
      <AddButtonLink link="/quiz/new" />
    </>
  );
};

export default QuizIdPage;
