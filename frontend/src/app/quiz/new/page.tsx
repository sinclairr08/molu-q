"use client";

import { SelectBox, SubmitButton } from "@/components/general";
import { ShortInput } from "@/components/quiz/ShortAnswer";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface IQuizInputForm {
  quizSetId?: number;
  problemId: number;
  problemType: string;
  question: string;
  selectList?: string[];
  answer: string;
}

const QuizAddPage: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IQuizInputForm>();
  const [selectItems, setSelectItems] = useState<string[]>();
  const addSelectItem = () => {
    const idx = selectItems ? selectItems.length : 0;
    setSelectItems((prev) =>
      prev ? [...prev, `객관식 ${idx + 1}`] : [`객관식 ${idx + 1}`],
    );
  };

  const currentProblemType = watch("problemType");

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
          <SelectBox
            register={register("problemType")}
            itemList={["short", "select", "musicSelect"]}
          />
        </label>
        <label className="flex items-center justify-center">
          <span className="px-2">문제</span>
          <ShortInput register={register("question")} />
        </label>
        {currentProblemType &&
          currentProblemType.toLowerCase().includes("select") && (
            <>
              {selectItems &&
                selectItems.map((selectItem, index) => (
                  <label
                    key={selectItem}
                    className="flex items-center justify-center"
                  >
                    <span className="px-2">{selectItem}</span>
                    <ShortInput register={register(`selectList.${index}`)} />
                  </label>
                ))}

              <label
                className="flex items-center justify-center cursor-pointer"
                onClick={addSelectItem}
              >
                +
              </label>
            </>
          )}
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
