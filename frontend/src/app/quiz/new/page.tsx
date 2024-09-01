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
  image?: FileList;
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

const FileInputRow = ({ register, label }: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <label htmlFor="file-upload">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-48 h-48 fill-current text-cyan-600 cursor-pointer"
        >
          <path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0ZM5,2H19a3,3,0,0,1,3,3V19a2.951,2.951,0,0,1-.3,1.285l-9.163-9.163a5,5,0,0,0-7.072,0L2,14.586V5A3,3,0,0,1,5,2ZM5,22a3,3,0,0,1-3-3V17.414l4.878-4.878a3,3,0,0,1,4.244,0L20.285,21.7A2.951,2.951,0,0,1,19,22Z" />
          <path d="M16,10.5A3.5,3.5,0,1,0,12.5,7,3.5,3.5,0,0,0,16,10.5Zm0-5A1.5,1.5,0,1,1,14.5,7,1.5,1.5,0,0,1,16,5.5Z" />
        </svg>

        <input id="file-upload" type="file" {...register} className="sr-only" />
      </label>
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
  const { register, handleSubmit, watch, reset } = useForm<IQuizInputForm>();
  const [selectItems, setSelectItems] = useState<string[]>();
  const addSelectItem = () => {
    const idx = selectItems ? selectItems.length : 0;
    setSelectItems((prev) =>
      prev ? [...prev, `객관식 ${idx + 1}`] : [`객관식 ${idx + 1}`],
    );
  };

  const deleteSelectItem = () => {
    setSelectItems((prev) => (prev ? prev.slice(0, -1) : prev));
  };

  const currentProblemType = watch("problemType");

  const isValid = (data: IQuizInputForm) => {
    if (!data.problemId || !data.question || !data.answer) {
      return;
    }

    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append("problemId", String(data.problemId));
      formData.append("image", data.image[0]);
    }

    const updatedData = {
      ...data,
      quizSetId: data.quizSetId ? Number(data.quizSetId) : 0,
      selectList: data.selectList || [],
    };

    try {
      axios.post("/api/v0/quiz", updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      axios.post("/api/v0/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
    } catch (error) {
      console.error(`${error} occurred`);
    }
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
              <div className="flex space-x-2 text-sm">
                <button
                  onClick={addSelectItem}
                  className="cursor-pointer rounded-md bg-cyan-200 p-2"
                >
                  객관식 문제 추가
                </button>
                <button
                  onClick={deleteSelectItem}
                  className="cursor-pointer rounded-md bg-cyan-200 p-2"
                >
                  객관식 문제 제거
                </button>
              </div>
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
        <FileInputRow register={register("image")} label="이미지" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default QuizAddPage;
