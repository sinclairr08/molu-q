import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";
import { useForm, UseFormRegister, UseFormWatch } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useQuiz } from "@/contexts/QuizContext";

export interface IQuiz {
  problemId: number;
  problemUid: number;
  problemType: string;
  question: string;
  audioPath?: string;
  imagePath?: string;
  selectList?: string[];
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
  const pathname = usePathname();
  const segments = pathname.split("/");

  const problemId = parseInt(segments[segments.length - 1]);
  const quizSetId = parseInt(segments[segments.length - 2]);

  const { submitAnswer } = useQuiz();

  const isValid = (data: IForm) => {
    if (!data.answer) {
      return;
    }
    submitAnswer({ problemId, answer: data.answer });
    router.push(`/quiz/${quizSetId}/${problemId}/result`);
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
