"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IHttp {
  code: number;
  message: string;
  ext: string;
}

interface HttpImageProps {
  code: number;
  ext: string;
}

const fetcher = (url: string) =>
  axios.get<IHttp[]>(url).then((res) => res.data);

export const HttpImage = ({ code, ext }: HttpImageProps) => {
  return (
    <div className="flex justify-center ">
      <img src={`/http/${code}.${ext}`} className="w-48 h-48" />
    </div>
  );
};

const HttpCard = (cardProps: IHttp) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={`/http/${cardProps.code}`}>
        <div className="bg-red-400 p-3 w-64  h-64">
          <div className="text-center text-white font-bold">
            {cardProps.code}
          </div>
          <div className="text-center text-white font-bold">
            {cardProps.message}
          </div>
          <HttpImage {...cardProps} />
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
    </div>
  );
};

export default HttpPage;
