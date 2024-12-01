"use client";

import { useQuiz } from "@/contexts/QuizContext";
import { useFetchData } from "@/lib/fetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IQuizAnswer {
  answer: string;
}

const QuizProblemPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { getAnswer, submitResult } = useQuiz();

  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 2]);
  const quizSetId = parseInt(segments[segments.length - 3]);
  const answerData = useFetchData<IQuizAnswer>(
    `/api/v0/quiz/sets/${quizSetId}/answer/${problemId}`,
    { answer: "" }
  );

  useEffect(() => {
    if (answerData && answerData.answer && problemId) {
      if (answerData.answer == getAnswer(problemId).answer) {
        setMessage(`정답! ${answerData.answer}`);
        submitResult({ quizSetId, problemId, status: true });
      } else {
        setMessage(`오답! ${answerData.answer}`);
        submitResult({ quizSetId, problemId, status: false });
      }
    }
  }, [answerData, problemId]);

  return (
    <div className="flex flex-col justify-center items-center text-cyan-400 font-bold">
      <span>{message}</span>
      <Link href={`/quiz/${quizSetId}/${problemId + 1}`}>NEXT</Link>
    </div>
  );
};

export default QuizProblemPage;
