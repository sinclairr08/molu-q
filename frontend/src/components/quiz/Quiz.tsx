import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";
import { useForm, UseFormRegister, UseFormWatch } from "react-hook-form";

import { useRouter } from "next/navigation";

export interface IQuiz {
  problemNo: number;
  problemType: string;
  question: string;
  musicPath?: string;
  imagePath?: string;
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
  const router = useRouter();

  const isValid = (data: IForm) => {
    if (!data.answer) {
      return;
    }
    // TODO: use post api to submit this answer
    // TODO: use router to move next problem Id
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
    </div>
  );
}
