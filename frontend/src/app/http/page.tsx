"use client";

import { Image } from "@/components/general";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface IHttp {
  code: number;
  message: string;
  imagePath: string;
  description?: string;
}

const fetcher = (url: string) =>
  axios.get<IHttp[]>(url).then((res) => res.data);

const HttpCard = (cardProps: IHttp) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={`/http/${cardProps.code}`}>
        <div className="bg-cyan-400 p-3 w-64 h-64 rounded-md">
          <div className="text-center text-white font-bold">
            {cardProps.code}
          </div>
          <div className="text-center text-white font-bold">
            {cardProps.message}
          </div>
          <Image {...cardProps} size={48} />
        </div>
      </Link>
    </div>
  );
};

const HttpPage: React.FC = () => {
  const [httpItems, setHttpItems] = useState<IHttp[]>([]);
  const { data } = useSWR<IHttp[]>(`/api/v0/http`, fetcher);

  useEffect(() => {
    if (data) {
      setHttpItems(data);
    }
  }, [data]);

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {httpItems.map((httpItem) => (
        <HttpCard key={httpItem.code} {...httpItem} />
      ))}
      <Link href={"/http/new"}>
        <div className="flex flex-col justify-center items-center border-cyan-400 border-2 rounded-full p-3 m-2 whitespace-nowrap overflow-hidden text-sm bg-cyan-100">
          HTTP 추가하기
        </div>
      </Link>
    </div>
  );
};

export default HttpPage;
