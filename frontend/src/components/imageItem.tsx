interface ImageItemProp {
  path: string;
}

export default function ImageItem({ path }: ImageItemProp) {
  return (
    <div className="flex justify-center">
      <img src={`/quiz/image/${path}.png`} />
    </div>
  );
}
