interface AnswerButtonProps {
  isAnswer: boolean | undefined;
}

export default function AnswerButton({ isAnswer }: AnswerButtonProps) {
  return (
    <>
      {isAnswer !== undefined && (
        <div className="flex justify-center">
          {isAnswer === true ? "정답입니다!" : "틀렸습니다!"}
        </div>
      )}
    </>
  );
}
