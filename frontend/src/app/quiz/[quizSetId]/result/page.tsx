"use client";

import Link from "next/link";

const QuizEndPage: React.FC = () => {
  return (
    <div className="mt-16 flex justify-center items-center text-cyan-400 font-bold">
      <div className="flex flex-col items-center">
        <span>ENDED</span>
        <Link href={`/quiz`}>HOME</Link>
      </div>
    </div>
  );
};

export default QuizEndPage;
