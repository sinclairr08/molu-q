"use client";

import { usePathname } from "next/navigation";
import { HttpImage } from "../page";
import { useEffect, useState } from "react";
import axios from "axios";

interface IHttpCode {
  message: string;
  ext: string;
  description: string;
}

const CodePage: React.FC = () => {
  const [httpCodeInfo, setHttpCodeInfo] = useState<IHttpCode>();
  const pathname = usePathname();

  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const code = parseInt(lastPath);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/http/${code}.json`);
        console.log(data);
        setHttpCodeInfo(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    httpCodeInfo && (
      <div className="flex flex-col justify-center items-center bg-red-400 py-24 space-y-8">
        <div className="text-center text-white font-bold">{code}</div>
        <div className="text-center text-white font-bold">
          {httpCodeInfo.message}
        </div>
        <HttpImage code={code} ext={httpCodeInfo.ext} message="" />
        <div className="text-center text-white font-bold  whitespace-pre-line">
          {httpCodeInfo.description}
        </div>
      </div>
    )
  );
};

export default CodePage;
