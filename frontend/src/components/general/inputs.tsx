import { UseFormRegisterReturn } from "react-hook-form";
import { SelectBox, ShortInput } from "./general";
import { AudioIcon } from "./audio";
import React from "react";

import { v4 as uuidv4 } from "uuid";
import { ImageIcon } from "./image";

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
