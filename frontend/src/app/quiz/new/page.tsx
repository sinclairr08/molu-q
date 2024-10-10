"use client";

import { SubmitButton } from "@/components/general/general";
import {
  AudioFileInputRow,
  AudioFilesInputRow,
  ImageFileInputRow,
  SelectInputRow,
  ShortInputRow
} from "@/components/general/inputs";
import { uploadData, uploadFile, uploadFiles } from "@/lib/upload";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IQuizInputForm {
  quizSetId: number;
  problemId: number;
  problemType: string;
  question: string;
  selectList?: string[];
  answer: string;
  image?: FileList;
  audio?: FileList;
  audios?: FileList;
}

interface IQuizRequest extends IQuizInputForm {
  imagePath?: string;
  audioPath?: string;
  audiosPath?: string[];
}

const QuizAddPage: React.FC = () => {
  const { register, handleSubmit, watch, reset } = useForm<IQuizInputForm>();
  const [selectItems, setSelectItems] = useState<string[]>();
  const addSelectItem = () => {
    const idx = selectItems ? selectItems.length : 0;
    setSelectItems((prev) =>
      prev ? [...prev, `객관식 ${idx + 1}`] : [`객관식 ${idx + 1}`]
    );
  };

  const deleteSelectItem = () => {
    setSelectItems((prev) => (prev ? prev.slice(0, -1) : prev));
  };

  const currentProblemType = watch("problemType");

  const isValid = async (data: IQuizInputForm) => {
    if (!data.quizSetId || !data.problemId || !data.question || !data.answer) {
      return;
    }

    const [imagePath, audioPath, audiosPath] = await Promise.all([
      uploadFile<IQuizRequest>(data, "image", "quiz"),
      uploadFile<IQuizRequest>(data, "audio", "quiz"),
      uploadFiles<IQuizRequest>(data, "audios", "quiz")
    ]);

    const updatedData = {
      ...data,
      quizSetId: data.quizSetId ? Number(data.quizSetId) : 0,
      ...(imagePath && { imagePath }),
      ...(audioPath && { audioPath }),
      ...(audiosPath.length > 0 && { audiosPath })
    };

    await uploadData<IQuizRequest>(updatedData, "/api/v0/quiz");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(isValid)}>
      <div className="flex flex-col items-center space-y-3 pb-8 mx-12">
        <ShortInputRow register={register("quizSetId")} label="세트 번호" />
        <ShortInputRow register={register("problemId")} label="문제 번호" />
        <SelectInputRow
          register={register("problemType")}
          label="문제 타입"
          itemList={["short", "select", "musicSelect"]}
        />

        <ShortInputRow register={register("question")} label="문제" />
        <AudioFileInputRow register={register("audio")} label="음악" />
        <ImageFileInputRow register={register("image")} label="이미지" />

        {currentProblemType && currentProblemType === "select" ? (
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
        ) : currentProblemType === "musicSelect" ? (
          <AudioFilesInputRow
            register={register("audios")}
            label="객관식 음악 (여러개 선택)"
            textSize="xs"
          />
        ) : (
          <></>
        )}
        <ShortInputRow register={register("answer")} label="답" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default QuizAddPage;
