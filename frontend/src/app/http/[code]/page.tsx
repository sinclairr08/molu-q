"use client";

import { useSearchParams } from "next/navigation";
import { HttpImage } from "../page";

const CodePage: React.FC = () => {
  const searchParams = useSearchParams();
  const code: number = parseInt(searchParams.get("code"));
  const message = searchParams.get("message");
  const ext = searchParams.get("ext");
  const description = "description";

  return (
    <div className="flex flex-col justify-center items-center bg-red-400 py-24 space-y-8">
      <div className="text-center text-white font-bold">{code}</div>
      <div className="text-center text-white font-bold">{message}</div>
      <HttpImage code={code} ext={ext} />
      <div className="text-center text-white font-bold">{description}</div>
    </div>
  );
};

export default CodePage;
