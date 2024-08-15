"use client";

import { useQuiz } from "@/contexts/QuizContext";
import Link from "next/link";

const QuizEndPage: React.FC = () => {
  const { answers } = useQuiz();
  return (
    <div className="mt-16 flex justify-center items-center text-cyan-400 font-bold">
      <div className="flex flex-col items-center">
        <span>ENDED</span>
        {answers.map((answer) => (
          <div key={answer.problemId}>
            Q{answer.problemId}: {answer.answer}
          </div>
        ))}

        <Link href={`/quiz`}>HOME</Link>
      </div>
    </div>
  );
};

export default QuizEndPage;
