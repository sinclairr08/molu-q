import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectItem from "@/components/selectItem";
import { IQuiz } from "@/components/quiz";
import SubmitButton from "@/components/submitButton";
import ShortInput from "@/components/shortInput";
import AnswerButton from "@/components/answerButton";

interface IShortInput {
  answer: string;
}

export default function ShortForm(quiz: IQuiz) {
  const { register, handleSubmit, watch } = useForm<IShortInput>();
  const [isAnswer, setIsAnswer] = useState<boolean | undefined>();

  const isValid = (data: IShortInput) => {
    setIsAnswer(data.answer.toLowerCase() === quiz.answer?.toLowerCase());
  };
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(isValid)}>
          <div className="flex flex-col space-y-2">
            <ShortInput register={register("answer")} />

            <SubmitButton />
          </div>
        </form>
      </div>
      <AnswerButton isAnswer={isAnswer} />
    </>
  );
}
