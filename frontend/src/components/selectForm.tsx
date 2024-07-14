import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectItem from "@/components/selectItem";
import { IQuiz } from "@/components/quiz";
import SubmitButton from "@/components/submitButton";
import AnswerButton from "@/components/answerButton";

interface ISelectInput {
  answerIndex: number;
}

export default function SelectForm(quiz: IQuiz) {
  const { register, handleSubmit, watch } = useForm<ISelectInput>();
  const [isAnswer, setIsAnswer] = useState<boolean | undefined>();

  const isValid = (data: ISelectInput) => {
    // 왜 === 일 때 안 되는지
    setIsAnswer(data.answerIndex == quiz.answerIndex);
  };
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(isValid)}>
          <div className="flex flex-col space-y-2">
            {quiz.answerList &&
              quiz.answerList.map((answerItem, i) => (
                <SelectItem
                  key={i}
                  register={register}
                  index={i}
                  answerItem={answerItem}
                  isCurrentClicked={watch("answerIndex") == i + 1}
                />
              ))}

            <SubmitButton />
          </div>
        </form>
      </div>
      <AnswerButton isAnswer={isAnswer} />
    </>
  );
}
