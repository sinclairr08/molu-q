import { Audio, Image } from "../general";
import { IQuiz } from "./Quiz";

export default function QuizQuestion(quiz: IQuiz) {
  return (
    <>
      <div className="flex justify-center">
        {quiz.problemId}: {quiz.question}
      </div>

      {quiz.musicPath && <Audio path={quiz.musicPath} />}
      <Image {...quiz} size={48} />
    </>
  );
}
