"use client";

import { createContext, useContext, useState } from "react";

interface QuizContextType {
  answers: { problemId: number; answer: string }[];
  submitAnswer: (data: { problemId: number; answer: string }) => void;
  resetAnswers: () => void;
  getAnswer: (problemId: number) => { problemId: number; answer: string };
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
      value={{ answers, submitAnswer, resetAnswers, getAnswer }}
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
