"use client";

import { useQuiz } from "@/contexts/QuizContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const QuizPage: React.FC = () => {
  const pathname = usePathname();
  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const quizSetId = parseInt(lastPath);

  const { resetAnswers } = useQuiz();

  useEffect(() => {
    resetAnswers();
  }, []);

  return (
    <div className="mt-16 flex justify-center items-center text-cyan-400 font-bold">
      <Link href={`/quiz/${quizSetId}/1`}>START!</Link>
    </div>
  );
};

export default QuizPage;
