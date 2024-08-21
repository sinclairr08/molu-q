"use client";

import { SelectBox, SubmitButton } from "@/components/general";
import { ShortInput } from "@/components/quiz/ShortAnswer";
import axios from "axios";
import { useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

export interface IQuizInputForm {
  quizSetId?: number;
  problemId: number;
  problemType: string;
  question: string;
  selectList?: string[];
  answer: string;
}

interface IShortInputRow {
  register: UseFormRegisterReturn<any>;
  label: string;
}

interface ISelectBoxRow {
  register: UseFormRegisterReturn<any>;
  label: string;
  itemList: string[];
}

const ShortInputRow = ({ register, label }: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <ShortInput register={register} />
    </label>
  );
};

const SelectBoxRow = ({ register, label, itemList }: ISelectBoxRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <SelectBox register={register} itemList={itemList} />
    </label>
  );
};

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
      <div className="flex flex-col items-center space-y-3 pb-8 mx-12">
        <ShortInputRow register={register("quizSetId")} label="세트 번호" />
        <ShortInputRow register={register("problemId")} label="문제 번호" />
        <SelectBoxRow
          register={register("problemType")}
          label="문제 타입"
          itemList={["short", "select", "musicSelect"]}
        />

        <ShortInputRow register={register("question")} label="문제" />

        {currentProblemType &&
          currentProblemType.toLowerCase().includes("select") && (
            <>
              <button
                onClick={addSelectItem}
                className="cursor-pointer rounded-md bg-cyan-200 p-2"
              >
                객관식 문제 추가
              </button>
              {selectItems &&
                selectItems.map((selectItem, index) => (
                  <ShortInputRow
                    register={register(`selectList.${index}`)}
                    label={selectItem}
                    key={selectItem}
                  />
                ))}
            </>
          )}
        <ShortInputRow register={register("answer")} label="답" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default QuizAddPage;
