"use client";

import { AddButtonLink } from "@/components/general/general";
import { Image } from "@/components/general/image";
import { useFetchData } from "@/lib/fetch";
import Link from "next/link";

export interface IHttp {
  code: number;
  message: string;
  imagePath: string;
  description?: string;
}

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
  const httpItems = useFetchData<IHttp[]>(`/api/v0/http`, []);

  return (
    <>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {httpItems.map((httpItem) => (
          <HttpCard key={httpItem.code} {...httpItem} />
        ))}
      </div>
      <AddButtonLink link="/http/new" />
    </>
  );
};

export default HttpPage;
