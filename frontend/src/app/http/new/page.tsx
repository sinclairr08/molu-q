"use client";

import { SubmitButton } from "@/components/general/general";
import { ImageFileInputRow, ShortInputRow } from "@/components/general/inputs";
import { uploadData, uploadFile } from "@/lib/upload";
import { useForm } from "react-hook-form";

export interface IHttpInputForm {
  code: number;
  message: string;
  description: string;
  image?: FileList;
}

interface IHttpRequest extends IHttpInputForm {
  imagePath?: string;
}

const HttpAddPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IHttpInputForm>();

  const isValid = async (data: IHttpInputForm) => {
    if (
      !data.code ||
      !data.description ||
      !data.message ||
      !data.image ||
      data.image.length == 0
    ) {
      return;
    }

    const imagePath = await uploadFile<IHttpRequest>(data, "image", "http");
    const updatedData = {
      ...data,
      ...(imagePath && { imagePath })
    };

    await uploadData<IHttpRequest>(updatedData, "/api/v0/http");
    reset();
  };
  return (
    <form onSubmit={handleSubmit(isValid)}>
      <div className="flex flex-col items-center space-y-3 pb-8 mx-12">
        <ShortInputRow register={register("code")} label="코드" />
        <ShortInputRow register={register("message")} label="메시지" />
        <ShortInputRow register={register("description")} label="설명" />
        <ImageFileInputRow register={register("image")} label="이미지" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default HttpAddPage;
