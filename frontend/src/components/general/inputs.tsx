import { UseFormRegisterReturn } from "react-hook-form";
import { SelectBox, ShortInput } from "./general";
import { AudioIcon } from "./audio";

interface IShortInputRow {
  register: UseFormRegisterReturn<any>;
  label: string;
  textSize?: string;
}

interface ISelectBoxRow {
  register: UseFormRegisterReturn<any>;
  label: string;
  itemList: string[];
}

export const ShortInputRow = ({ register, label }: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <ShortInput register={register} />
    </label>
  );
};

export const FileInputRow = ({ register, label }: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <label htmlFor="file-upload" className="w-48 pl-12">
        <input id="file-upload" type="file" {...register} className="sr-only" />
        <ImageIcon size={24} />
      </label>
    </label>
  );
};

export const AudioFileInputRow = ({ register, label }: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <label htmlFor="file-upload" className="w-48 pl-12">
        <input id="file-upload" type="file" {...register} className="sr-only" />
        <AudioIcon size={24} />
      </label>
    </label>
  );
};

export const AudioFilesInputRow = ({
  register,
  label,
  textSize
}: IShortInputRow) => {
  return (
    <label className="flex items-center">
      <span className={`px-2 w-24 text-${textSize}`}>{label}</span>
      <label htmlFor="file-upload2" className="w-48 pl-12">
        <input
          id="file-upload2"
          type="file"
          {...register}
          className="sr-only"
          multiple
        />
        <AudioIcon size={24} />
      </label>
    </label>
  );
};

export const SelectBoxRow = ({ register, label, itemList }: ISelectBoxRow) => {
  return (
    <label className="flex items-center">
      <span className="px-2 w-24">{label}</span>
      <SelectBox register={register} itemList={itemList} />
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
