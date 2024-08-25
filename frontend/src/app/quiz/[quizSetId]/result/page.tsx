"use client";

import { useQuiz } from "@/contexts/QuizContext";
import Link from "next/link";

const QuizEndPage: React.FC = () => {
  const { getTotalResult } = useQuiz();
  const { correct, total } = getTotalResult();
  return (
    <div className="flex justify-center items-center text-cyan-400 font-bold">
      <div className="flex flex-col items-center">
        <span>
          Score: {correct} / {total}
        </span>

        <Link href={`/quiz`}>HOME</Link>
      </div>
    </div>
  );
};

export default QuizEndPage;
