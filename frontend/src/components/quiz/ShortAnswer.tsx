import { UseFormRegisterReturn } from "react-hook-form";
import { IQuizForm } from "./Quiz";
import { SubmitButton } from "../general";

const ShortInput = ({ register }: { register: UseFormRegisterReturn<any> }) => {
  return (
    <div className="flex justify-center">
      <input
        className="border-2 border-orange-200 rounded-md p-1 text-orange-600
        focus:border-orange-600 focus:outline-none"
        {...register}
      />
    </div>
  );
};

export default function ShortAnswer({ register, handleSubmit }: IQuizForm) {
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <ShortInput register={register("answer")} />
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  );
}
