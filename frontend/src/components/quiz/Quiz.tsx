import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";
import { useState } from "react";
import { useForm, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface IQuiz {
  problemNo: number;
  problemType: string;
  question: string;
  musicPath?: string;
  imagePath?: string;
  answer?: string;
  answerList?: string[];
}

interface IForm {
  answer: string;
}

export interface IQuizForm extends IQuiz {
  register: UseFormRegister<IForm>;
  handleSubmit: () => void;
  watch: UseFormWatch<IForm>;
  isMusic?: boolean;
}

export default function Quiz(quiz: IQuiz) {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const [isAnswer, setIsAnswer] = useState<boolean | undefined>();

  const isValid = (data: IForm) => {
    console.log(data);
    console.log(quiz);
    if (!data.answer) {
      return;
    }
    setIsAnswer(data.answer.toLowerCase() === quiz.answer?.toLowerCase());
  };

  return (
    <div key={quiz.question} className="flex flex-col space-y-3 pb-8">
      <QuizQuestion {...quiz} />
      <QuizAnswer
        {...quiz}
        register={register}
        handleSubmit={handleSubmit(isValid)}
        watch={watch}
      />
      <QuizResult isAnswer={isAnswer} />
    </div>
  );
}

const QuizResult = ({ isAnswer }: { isAnswer: boolean | undefined }) => {
  if (isAnswer === undefined) {
    return null;
  }

  return (
    <div className="flex justify-center">
      {isAnswer === true ? "정답입니다!" : "틀렸습니다!"}
    </div>
  );
};
