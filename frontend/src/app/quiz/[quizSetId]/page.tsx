"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const QuizPage: React.FC = () => {
  const pathname = usePathname();
  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const quizSetId = parseInt(lastPath);

  return (
    <div className="mt-16 flex justify-center items-center text-cyan-400 font-bold">
      <Link href={`/quiz/${quizSetId}/1`}>START!</Link>
    </div>
  );
};

export default QuizPage;
