import SelectItem from "@/components/quiz/SelectItem";
import { IQuizForm } from "@/components/quiz/Quiz";
import { SubmitButton } from "../general";

export default function SelectAnswer({
  problemNo,
  answerList,
  register,
  handleSubmit,
  watch,
  isMusic,
}: IQuizForm) {
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          {answerList &&
            answerList.map((answerItem, i) => (
              <SelectItem
                key={`${problemNo}_${i}`}
                register={register}
                index={i}
                answerItem={answerItem}
                isCurrentClicked={watch("answer") == String(i + 1)}
                isMusic={isMusic}
              />
            ))}
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
