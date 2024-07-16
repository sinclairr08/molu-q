import { UseFormRegister } from "react-hook-form";
import { Audio } from "../general";

interface ISelectItem {
  index: number;
  register: UseFormRegister<any>;
  answerItem: string;
  isCurrentClicked: boolean;
  isMusic?: boolean;
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export default function SelectItem(data: ISelectItem) {
  const { index, register, answerItem, isCurrentClicked, isMusic } = data;

  return (
    <div
      className={cls(
        "",
        isCurrentClicked ? "text-red-500" : "text-neutral-800"
      )}
    >
      <label className="">
        <span
          className={cls(
            "m-1 px-1.5 border-2 rounded-full",
            isCurrentClicked ? "border-red-500" : "border-neutral-800"
          )}
        >
          {index + 1}
        </span>
        <input
          type="radio"
          className="sr-only"
          value={String(index + 1)}
          {...register("answer")}
        />
        {isMusic ? <Audio path={answerItem} /> : answerItem}
      </label>
    </div>
  );
}
