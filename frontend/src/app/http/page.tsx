"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface IHttp {
  code: number;
  message: string;
  ext: string;
}

export const HttpImage = ({ code, ext }: IHttp) => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/http/http.json");
        console.log(data);
        setHttpItems(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {httpItems.map((httpItem) => (
        <HttpCard key={httpItem.code} {...httpItem} />
      ))}
    </div>
  );
};

export default HttpPage;
