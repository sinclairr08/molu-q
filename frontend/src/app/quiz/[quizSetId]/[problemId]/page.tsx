"use client";

import Quiz, { IQuiz } from "@/components/quiz/Quiz";
import { useFetchData } from "@/lib/fetch";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialQuizState: IQuiz = {
  problemId: 0,
  problemUid: 0,
  problemType: "short",
  question: ""
};

const QuizProblemPage: React.FC = () => {
  const [quiz, setQuiz] = useState<IQuiz>(initialQuizState);

  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 1]);
  const quizSetId = parseInt(segments[segments.length - 2]);

  const quizs = useFetchData<IQuiz[]>(`/api/v0/quiz/sets/${quizSetId}`, []);
  const router = useRouter();

  useEffect(() => {
    if (quizs) {
      const targetQuiz = quizs.find((quiz) => quiz.problemId === problemId);
      if (!targetQuiz) {
        router.push(`/quiz/${quizSetId}/result`);
      } else {
        setQuiz(targetQuiz);
      }
    }
  }, [quizs, problemId]);

  return (
    <div>
      <Quiz key={quiz.problemId} {...quiz} />
    </div>
  );
};

export default QuizProblemPage;
