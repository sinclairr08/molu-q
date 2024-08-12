"use client";

import Quiz, { IQuiz } from "@/components/quiz/Quiz";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const initialQuizState: IQuiz = {
  problemId: 0,
  problemUid: 0,
  problemType: "short",
  question: "",
};

const QuizProblemPage: React.FC = () => {
  const [quiz, setQuiz] = useState<IQuiz>(initialQuizState);

  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 1]);
  const quizSetId = parseInt(segments[segments.length - 2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<IQuiz[]>(
          `/api/v0/quiz/sets/${quizSetId}`,
        );
        const targetQuiz = data.find((block) => block.problemId === problemId);
        if (!targetQuiz) {
          throw new Error("no such problem Id");
        }
        setQuiz(targetQuiz);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16">
      <Quiz key={quiz.problemId} {...quiz} />
    </div>
  );
};

export default QuizProblemPage;
