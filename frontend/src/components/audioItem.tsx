interface AudioItemProp {
  path: string;
}

export default function AudioItem({ path }: AudioItemProp) {
  return (
    <div className="flex justify-center">
      <audio controls src={`/quiz/music/${path}.mp3`} />
    </div>
  );
}
