import { UseFormRegisterReturn } from "react-hook-form";

export const Audio = ({ path }: { path: string }) => {
  return (
    <div className="flex justify-center">
      <audio controls src={`/quiz/music/${path}.mp3`} />
    </div>
  );
};

export const Image = ({ path }: { path: string }) => {
  return (
    <div className="flex justify-center">
      <img src={`/quiz/image/${path}.png`} />
    </div>
  );
};

export const SubmitButton = () => {
  return (
    <div className="flex justify-center">
      <input
        type="submit"
        className="cursor-pointer rounded-md bg-orange-200 w-12 p-2"
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
    <select {...register} className="focus:outline-none">
      {itemList.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};
