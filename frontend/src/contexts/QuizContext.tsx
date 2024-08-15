"use client";

import { createContext, useContext, useState } from "react";

interface QuizContextType {
  answers: { problemId: number; answer: string }[];
  submitAnswer: (data: { problemId: number; answer: string }) => void;
  resetAnswers: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: any) => {
  const [answers, setAnswers] = useState<
    { problemId: number; answer: string }[]
  >([]);

  const submitAnswer = (data: { problemId: number; answer: string }) => {
    setAnswers((prevAnswers) => [...prevAnswers, data]);
  };

  const resetAnswers = () => {
    setAnswers([]);
  };

  return (
    <QuizContext.Provider value={{ answers, submitAnswer, resetAnswers }}>
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
