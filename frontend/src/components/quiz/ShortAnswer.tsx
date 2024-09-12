import { IQuizForm } from "./Quiz";
import { ShortInput, SubmitButton } from "../general";

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
