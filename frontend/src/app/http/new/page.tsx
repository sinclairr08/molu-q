"use client";

import { SubmitButton } from "@/components/general/general";
import { FileInputRow, ShortInputRow } from "@/components/general/inputs";
import axios from "axios";
import { useForm } from "react-hook-form";

export interface IHttpInputForm {
  code: number;
  message: string;
  description: string;
  image?: FileList;
}

interface IHttpRequest extends IHttpInputForm {
  imagePath: string;
}

const HttpAddPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IHttpInputForm>();

  const uploadImage = async (data: IHttpInputForm) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
      formData.append("imageId", `http_${data.code}_${data.image[0].name}`);
    }

    try {
      const response = await axios.post("/api/v0/upload", formData, {
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

  const uploadHttp = async (data: IHttpRequest) => {
    try {
      axios.post("/api/v0/http", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      reset();
    } catch (error) {
      console.error(`${error} occurred`);
    }
  };

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

    // Null Check
    const imagePath = await uploadImage(data);
    const updatedData = {
      ...data,
      imagePath
    };

    await uploadHttp(updatedData);
  };
  return (
    <form onSubmit={handleSubmit(isValid)}>
      <div className="flex flex-col items-center space-y-3 pb-8 mx-12">
        <ShortInputRow register={register("code")} label="코드" />
        <ShortInputRow register={register("message")} label="메시지" />
        <ShortInputRow register={register("description")} label="설명" />
        <FileInputRow register={register("image")} label="이미지" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default HttpAddPage;
