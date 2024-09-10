"use client";

import { usePathname } from "next/navigation";
import { IHttp } from "../page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { Image } from "@/components/general";

const fetcher = (url: string) => axios.get<IHttp>(url).then((res) => res.data);

const HttpDetailCard = (cardProps: IHttp) => {
  return (
    <div className="flex flex-col justify-center items-center bg-cyan-400 p-3 rounded-md space-y-3">
      <div className="text-center text-white font-bold">{cardProps.code}</div>
      <div className="text-center text-white font-bold">
        {cardProps.message}
      </div>
      <Image {...cardProps} size={64} />
      <div className="text-center text-white font-bold text-xs whitespace-pre-line">
        {cardProps.description}
      </div>
      <Link href="/http">
        <button className="bg-cyan-600 p-2 font-bold text-white rounded-md">
          back
        </button>
      </Link>
    </div>
  );
};

const CodePage: React.FC = () => {
  const [httpDetailItem, setHttpDetaiItem] = useState<IHttp>();
  const pathname = usePathname();

  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const code = parseInt(lastPath);

  const { data } = useSWR<IHttp>(`/api/v0/http/${code}`, fetcher);

  useEffect(() => {
    if (data) {
      setHttpDetaiItem(data);
    }
  }, [data]);

  return (
    <>
      {httpDetailItem && (
        <HttpDetailCard key={httpDetailItem.code} {...httpDetailItem} />
      )}
    </>
  );
};

export default CodePage;
