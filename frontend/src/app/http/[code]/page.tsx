"use client";

import { usePathname } from "next/navigation";
import { IHttp } from "../page";
import Link from "next/link";
import { Image } from "@/components/general/image";
import { useFetchData } from "@/lib/fetch";

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
  const pathname = usePathname();

  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const code = parseInt(lastPath);

  const httpDetailItem = useFetchData<IHttp>(`/api/v0/http/${code}`, {
    code: 0,
    message: "",
    imagePath: ""
  });

  return (
    <>
      {httpDetailItem && (
        <HttpDetailCard key={httpDetailItem.code} {...httpDetailItem} />
      )}
    </>
  );
};

export default CodePage;
