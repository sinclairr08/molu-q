"use client";

import { SubmitButton } from "@/components/general";
import { ShortInput } from "@/components/quiz/ShortAnswer";
import axios from "axios";
import { useForm } from "react-hook-form";

export interface IQuizInputForm {
  quizSetId?: number;
  problemId: number;
  problemType: string;
  question: string;
  answer: string;
}

const QuizAddPage: React.FC = () => {
  const { register, handleSubmit } = useForm<IQuizInputForm>();

  const isValid = (data: IQuizInputForm) => {
    if (
      !data.problemId ||
      data.problemType != "short" ||
      !data.question ||
      !data.answer
    ) {
      return;
    }

    const updatedData = {
      ...data,
      quizSetId: data.quizSetId ? Number(data.quizSetId) : 0,
    };

    console.log(updatedData);

    axios.post("/api/v0/quiz", updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(isValid)}>
      <div className="flex flex-col space-y-3 pb-8">
        <label className="flex items-center justify-center">
          <span className="px-2">세트 번호</span>
          <ShortInput register={register("quizSetId")} />
        </label>
        <label className="flex items-center justify-center">
          <span className="px-2">문제 번호</span>
          <ShortInput register={register("problemId")} />
        </label>
        <label className="flex items-center justify-center">
          <span className="px-2">문제 타입</span>
          <ShortInput register={register("problemType")} />
        </label>
        <label className="flex items-center justify-center">
          <span className="px-2">문제</span>
          <ShortInput register={register("question")} />
        </label>
        <label className="flex items-center justify-center">
          <span className="px-2">답</span>
          <ShortInput register={register("answer")} />
        </label>
        <SubmitButton />
      </div>
    </form>
  );
};

export default QuizAddPage;
