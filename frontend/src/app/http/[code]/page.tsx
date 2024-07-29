"use client";

import { usePathname } from "next/navigation";
import { HttpImage } from "../page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
        const { data } = await axios.get(`/api/http/${code}`);
        setHttpCodeInfo(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    httpCodeInfo && (
      <div className="flex flex-col justify-center items-center bg-red-400 pt-24 pb-12 space-y-2">
        <div className="text-center text-white font-bold">{code}</div>
        <div className="text-center text-white font-bold">
          {httpCodeInfo.message}
        </div>
        <HttpImage code={code} ext={httpCodeInfo.ext} />
        <div className="text-center text-white font-bold  whitespace-pre-line">
          {httpCodeInfo.description}
        </div>
        <Link href="/http">
          <button className="bg-white p-2 rounded-md">back</button>
        </Link>
      </div>
    )
  );
};

export default CodePage;
