"use client";

import { useQuiz } from "@/contexts/QuizContext";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IQuizAnswer {
  answer: string;
}

const fetcher = (url: string) =>
  axios.get<IQuizAnswer>(url).then((res) => res.data);

const QuizProblemPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { getAnswer } = useQuiz();

  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 2]);
  const quizSetId = parseInt(segments[segments.length - 3]);

  const { data } = useSWR<IQuizAnswer>(
    `/api/v0/quiz/sets/${quizSetId}/answer/${problemId}`,
    fetcher,
  );

  useEffect(() => {
    if (data && data.answer) {
      if (data.answer == getAnswer(problemId).answer) {
        setMessage(`정답! ${data.answer}`);
      } else {
        setMessage(`오답! ${data.answer}`);
      }
    }
  }, [data, problemId]);

  return (
    <div className="mt-16 flex flex-col justify-center items-center text-cyan-400 font-bold">
      <span>{message}</span>
      <Link href={`/quiz/${quizSetId}/${problemId + 1}`}>NEXT</Link>
    </div>
  );
};

export default QuizProblemPage;
