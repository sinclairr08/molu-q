"use client";

import { ShortInput, SubmitButton } from "@/components/general";
import axios from "axios";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

export interface IHttpInputForm {
  code: number;
  message: string;
  description: string;
  image?: FileList;
}

interface IHttpRequest extends IHttpInputForm {
  imagePath: string;
}

interface IShortInputRow {
  register: UseFormRegisterReturn<any>;
  label: string;
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
        <ShortInputRow register={register("description")} label="설명" />
        <ShortInputRow register={register("message")} label="메시지" />
        <FileInputRow register={register("image")} label="이미지" />
        <SubmitButton />
      </div>
    </form>
  );
};

export default HttpAddPage;
