import { IQuizForm } from "./Quiz";
import SelectAnswer from "./SelectAnswer";
import ShortAnswer from "./ShortAnswer";

export default function QuizAnswer(quizForm: IQuizForm) {
  return (
    <div key={quizForm.question} className="flex flex-col space-y-4 pb-4">
      {quizForm.problemType == "select" ? (
        <SelectAnswer {...quizForm} />
      ) : quizForm.problemType == "musicSelect" ? (
        <SelectAnswer {...quizForm} isMusic={true} />
      ) : (
        <ShortAnswer {...quizForm} />
      )}
    </div>
  );
}
