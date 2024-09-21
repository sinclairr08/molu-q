import { Image } from "@/components/general/general";
import { Audio } from "@/components/general/audio";
import { IQuiz } from "./Quiz";

export default function QuizQuestion(quiz: IQuiz) {
  return (
    <>
      <div className="flex justify-center">
        {quiz.problemId}: {quiz.question}
      </div>

      <Audio {...quiz} />
      <Image {...quiz} size={48} />
    </>
  );
}
