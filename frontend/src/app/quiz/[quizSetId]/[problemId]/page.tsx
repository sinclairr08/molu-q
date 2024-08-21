"use client";

import Quiz, { IQuiz } from "@/components/quiz/Quiz";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const initialQuizState: IQuiz = {
  problemId: 0,
  problemUid: 0,
  problemType: "short",
  question: "",
};

const fetcher = (url: string) =>
  axios.get<IQuiz[]>(url).then((res) => res.data);

const QuizProblemPage: React.FC = () => {
  const [quiz, setQuiz] = useState<IQuiz>(initialQuizState);

  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 1]);
  const quizSetId = parseInt(segments[segments.length - 2]);

  const { data } = useSWR<IQuiz[]>(`/api/v0/quiz/sets/${quizSetId}`, fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const targetQuiz = data.find((block) => block.problemId === problemId);
      if (!targetQuiz) {
        router.push(`/quiz/${quizSetId}/result`);
      } else {
        setQuiz(targetQuiz);
      }
    }
  }, [data, problemId]);

  return (
    <div>
      <Quiz key={quiz.problemId} {...quiz} />
    </div>
  );
};

export default QuizProblemPage;
