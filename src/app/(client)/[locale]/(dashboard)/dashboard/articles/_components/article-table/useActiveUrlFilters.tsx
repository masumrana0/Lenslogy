"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useActiveUrlFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = new URLSearchParams(searchParams.toString());

  const removeFilter = (key: string) => {
    filters.delete(key);
    router.push(`?${filters.toString()}`);
  };

  const getAllFilters = () => {
    const entries: { key: string; value: string }[] = [];

    filters.forEach((value, key) => {
      entries.push({ key, value });
    });

    return entries;
  };

  return { filters, getAllFilters, removeFilter };
};
