"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export const useFetchData = <T>(url: string, defaultValue: T) => {
  const { data } = useSWR<T>(url, fetcher);
  const [item, setItem] = useState<T>(defaultValue);

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  return item;
};
