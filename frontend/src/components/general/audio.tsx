interface AudioProps {
  musicPath?: string;
}

export const Audio = ({ musicPath }: AudioProps) => {
  if (!musicPath) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <audio controls src={musicPath} />
    </div>
  );
};
