"use client";

import { useParams } from "next/navigation";

const CodePage: React.FC = () => {
  const { code } = useParams();
  console.log(code);
  return <div className="mt-16">{code}</div>;
};

export default CodePage;
