import SelectItem from "@/components/quiz/SelectItem";
import { IQuizForm } from "@/components/quiz/Quiz";
import { SubmitButton } from "../general";

export default function SelectAnswer({
  problemId,
  selectList,
  register,
  handleSubmit,
  watch,
  isMusic,
}: IQuizForm) {
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          {selectList &&
            selectList.map((selectItem, i) => (
              <SelectItem
                key={`${problemId}_${i}`}
                register={register}
                index={i}
                selectItem={selectItem}
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
