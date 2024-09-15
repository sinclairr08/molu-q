import Link from "next/link";
import { UseFormRegisterReturn } from "react-hook-form";

interface ImageProps {
  imagePath?: string;
  size?: number;
}

export const Audio = ({ path }: { path: string }) => {
  return (
    <div className="flex justify-center">
      <audio controls src={`/quiz/music/${path}.mp3`} />
    </div>
  );
};

export const Image = ({ imagePath, size }: ImageProps) => {
  if (!imagePath) {
    return null;
  }
  return (
    <div className="flex justify-center">
      <img src={imagePath} className={size ? `w-${size} h-${size}` : ""} />
    </div>
  );
};

export const SubmitButton = () => {
  return (
    <div className="flex justify-center">
      <input
        type="submit"
        className="cursor-pointer rounded-md bg-cyan-200 w-12 p-2"
      />
    </div>
  );
};

interface ISelectBoxInput {
  register: UseFormRegisterReturn<any>;
  itemList: string[];
}

export const SelectBox = ({ register, itemList }: ISelectBoxInput) => {
  return (
    <select
      {...register}
      className="border-2 border-cyan-200 rounded-md p-1 text-cyan-600
        focus:border-cyan-600 focus:outline-none w-48"
    >
      {itemList.map((item) => (
        <option key={item} className="text-center text-cyan-800">
          {item}
        </option>
      ))}
    </select>
  );
};

export const ShortInput = ({
  register
}: {
  register: UseFormRegisterReturn<any>;
}) => {
  return (
    <div className="flex justify-center">
      <input
        className="border-2 border-cyan-200 rounded-md p-1 text-cyan-600
        focus:border-cyan-600 focus:outline-none w-48"
        {...register}
      />
    </div>
  );
};

export const AddButtonLink = ({ link }: { link: string }) => {
  return (
    <div className="mx-auto mt-12 w-12">
      <Link href={link}>
        <div
          className="mt-4 flex flex-col justify-center items-center
        rounded-full p-3 whitespace-nowrap overflow-hidden
        text-lg text-white font-bold bg-cyan-400"
        >
          +
        </div>
      </Link>
    </div>
  );
};
