import { UseFormRegisterReturn } from "react-hook-form";
import { SelectBox, ShortInput } from "./general";
import { AudioIcon } from "./audio";
import React from "react";

import { v4 as uuidv4 } from "uuid";

interface InputRowProps {
  register: UseFormRegisterReturn<any>;
  label: string;
  textSize?: string;
  itemList?: string[];
  Icon?: React.ElementType;
  fileType?: "audios" | "audio" | "images" | "image";
}

export const ShortInputRow = ({ register, label, textSize }: InputRowProps) => {
  return (
    <label className="flex items-center">
      <span className={`px-2 w-24 text-${textSize}`}>{label}</span>
      <ShortInput register={register} />
    </label>
  );
};

export const FileInputRow = ({
  register,
  label,
  fileType,
  Icon = ImageIcon,
  textSize = "sm"
}: InputRowProps) => {
  const isMultiple = fileType == "audios" || fileType == "images";
  const inputId = `id-${fileType}-${uuidv4()}`;
  return (
    <label className="flex items-center">
      <span className={`px-2 w-24 text-${textSize}`}>{label}</span>
      <label htmlFor={inputId} className="w-48 pl-12">
        <input
          id={inputId}
          type="file"
          {...register}
          className="sr-only"
          multiple={isMultiple}
        />
        <Icon size={24} />
      </label>
    </label>
  );
};

export const AudioFileInputRow = (props: InputRowProps) => (
  <FileInputRow {...props} Icon={AudioIcon} fileType="audio" />
);

export const AudioFilesInputRow = (props: InputRowProps) => (
  <FileInputRow {...props} Icon={AudioIcon} fileType="audios" />
);

export const ImageFileInputRow = (props: InputRowProps) => (
  <FileInputRow {...props} Icon={ImageIcon} fileType="image" />
);

export const ImageFilesInputRow = (props: InputRowProps) => (
  <FileInputRow {...props} Icon={ImageIcon} fileType="images" />
);

export const SelectInputRow = ({
  register,
  label,
  itemList
}: InputRowProps) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      {itemList && <SelectBox register={register} itemList={itemList} />}
    </label>
  );
};

export const ImageIcon = ({ size = 48 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-${size} h-${size} fill-current text-cyan-600 cursor-pointer`}
    >
      <path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0ZM5,2H19a3,3,0,0,1,3,3V19a2.951,2.951,0,0,1-.3,1.285l-9.163-9.163a5,5,0,0,0-7.072,0L2,14.586V5A3,3,0,0,1,5,2ZM5,22a3,3,0,0,1-3-3V17.414l4.878-4.878a3,3,0,0,1,4.244,0L20.285,21.7A2.951,2.951,0,0,1,19,22Z" />
      <path d="M16,10.5A3.5,3.5,0,1,0,12.5,7,3.5,3.5,0,0,0,16,10.5Zm0-5A1.5,1.5,0,1,1,14.5,7,1.5,1.5,0,0,1,16,5.5Z" />
    </svg>
  );
};
