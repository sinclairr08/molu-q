"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Image = ({ code }: { code: number }) => {
  return (
    <div className="flex justify-center">
      <img src={`/http/${code}.png`} />
    </div>
  );
};

const Card = ({ code }: { code: number }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={`/http/${code}`}>
        <div className="bg-red-500 p-4">
          <div className="text-center text-white font-bold">{code}</div>
          <Image code={code} />
        </div>
      </Link>
    </div>
  );
};

const HttpPage: React.FC = () => {
  return (
    <div className="mt-16">
      <Card code={410} />
    </div>
  );
};

export default HttpPage;
