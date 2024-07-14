import AudioItem from "@/components/audioItem";
import SelectForm from "@/components/selectForm";
import SelectMusicForm from "@/components/selectMusicForm";
import ShortForm from "@/components/shortForm";
import ImageItem from "@/components/imageItem";

export interface IQuiz {
  problemNo: number;
  problemType: string;
  question: string;
  musicPath?: string;
  imagePath?: string;
  answer?: string;
  answerList?: string[];
  answerIndex?: number;
}

export default function Quiz(quiz: IQuiz) {
  return (
    <div key={quiz.question} className="flex flex-col space-y-4 pb-12">
      <div className="flex justify-center">
        {quiz.problemNo}: {quiz.question}
      </div>

      {quiz.musicPath && <AudioItem path={quiz.musicPath} />}
      {quiz.imagePath && <ImageItem path={quiz.imagePath} />}

      {quiz.problemType == "select" ? (
        <SelectForm {...quiz} />
      ) : quiz.problemType == "musicSelect" ? (
        <SelectMusicForm {...quiz} />
      ) : (
        <ShortForm {...quiz} />
      )}
    </div>
  );
}
