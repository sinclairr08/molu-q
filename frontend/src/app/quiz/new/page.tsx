"use client";

import { SubmitButton } from "@/components/general/general";
import {
  AudioFileInputRow,
  AudioFilesInputRow,
  FileInputRow,
  SelectBoxRow,
  ShortInputRow
} from "@/components/general/inputs";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IQuizInputForm {
  quizSetId?: number;
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
}

const uploadAudioApi = async (audio: File, fn: string): Promise<string> => {
  const formData = new FormData();

  formData.append("audio", audio);
  formData.append("audioId", fn);

  try {
    const { data } = await axios.post("/api/v0/upload/audios", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return data?.audioPath || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

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

  const uploadImage = async (data: IQuizRequest) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
      formData.append(
        "imageId",
        `quiz_set${data.quizSetId ? Number(data.quizSetId) : 0}_problem${data.problemId}_${data.image[0].name}`
      );
    }

    try {
      const response = await axios.post("/api/v0/upload/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data && response.data.imagePath) {
        return response.data.imagePath;
      }
      return "";
    } catch (error) {
      console.error(`${error} occurred`);
      return "";
    }
  };

  const uploadAudio = async (data: IQuizRequest): Promise<string> => {
    if (!data.audio || data.audio.length === 0) {
      return "";
    }

    const audio = data.audio[0];
    const fn = `quiz_set${data.quizSetId ? Number(data.quizSetId) : 0}_problem${data.problemId}_${audio.name}`;
    const result = await uploadAudioApi(audio, fn);

    return result;
  };

  const uploadAudios = async (data: IQuizRequest): Promise<string[]> => {
    if (!data.audios) {
      return [];
    }

    const audios = Array.from(data.audios);
    const results: string[] = [];

    for (const audio of audios) {
      const fn = `quiz_answer_set${data.quizSetId ? Number(data.quizSetId) : 0}_problem${data.problemId}_${audio.name}`;
      const result = await uploadAudioApi(audio, fn);

      if (!result) {
        return [];
      }

      results.push(result);
    }

    return results;
  };

  const uploadQuiz = async (data: IQuizRequest) => {
    try {
      axios.post("/api/v0/quiz", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      reset();
    } catch (error) {
      console.error(`${error} occurred`);
    }
  };

  const isValid = async (data: IQuizInputForm) => {
    if (!data.problemId || !data.question || !data.answer) {
      return;
    }

    let imagePath = "";
    if (data.image && data.image.length > 0) {
      imagePath = await uploadImage(data);
    }

    let audioPath = "";
    if (data.audio && data.audio.length > 0) {
      audioPath = await uploadAudio(data);
    }

    let audiosPath: any = [];
    if (data.audios && data.audios.length > 0) {
      audiosPath = await uploadAudios(data);
    }

    const updatedData = {
      ...data,
      quizSetId: data.quizSetId ? Number(data.quizSetId) : 0,
      ...(imagePath !== "" && { imagePath }),
      ...(audioPath !== "" && { audioPath }),
      ...(audiosPath.length !== 0 && { audiosPath })
    };

    await uploadQuiz(updatedData);
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
        <AudioFileInputRow register={register("audio")} label="음악" />
        <FileInputRow register={register("image")} label="이미지" />

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
            label="음악 객관식 (중복 선택 가능)"
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
