"use client";

import { createContext, useContext, useState } from "react";

interface IQuizResultSubmit {
  quizSetId: number;
  problemId: number;
  status: boolean;
}

interface QuizContextType {
  answers: { problemId: number; answer: string }[];
  results: IQuizResultSubmit[];
  submitAnswer: (data: { problemId: number; answer: string }) => void;
  submitResult: (data: IQuizResultSubmit) => void;
  reset: () => void;
  getAnswer: (problemId: number) => { problemId: number; answer: string };
  getTotalResult: () => { correct: number; total: number };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: any) => {
  const [answers, setAnswers] = useState<
    { problemId: number; answer: string }[]
  >([]);
  const [results, setResults] = useState<IQuizResultSubmit[]>([]);

  const submitAnswer = (data: { problemId: number; answer: string }) => {
    setAnswers((prevAnswers) => [...prevAnswers, data]);
  };

  const submitResult = (data: IQuizResultSubmit) => {
    setResults((prev) =>
      prev.some(
        (result) =>
          result.problemId === data.problemId &&
          result.quizSetId === data.quizSetId,
      )
        ? prev.map((result) =>
            result.problemId === data.problemId &&
            result.quizSetId === data.quizSetId
              ? { ...result, ...data }
              : result,
          )
        : [...prev, data],
    );
    console.log(results);
  };

  const getTotalResult = () => {
    const correct = results.filter((item) => item.status === true).length;
    const total = results.length;
    return { correct, total };
  };

  const reset = () => {
    setAnswers([]);
    setResults([]);
  };

  const getAnswer = (problemId: number) => {
    return (
      answers.find((answer) => answer.problemId === problemId) || {
        problemId: 0,
        answer: "",
      }
    );
  };

  return (
    <QuizContext.Provider
      value={{
        answers,
        results,
        submitResult,
        submitAnswer,
        reset,
        getAnswer,
        getTotalResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("");
  }

  return context;
};
