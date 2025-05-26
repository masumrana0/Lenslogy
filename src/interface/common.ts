import { Language } from "@prisma/client";

export type IParamsProps = {
  params: Promise<{ locale: "bn" | "en" }>;
};
export interface PageProps {
  params: Promise<{ locale: string; [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

 
export type langProps = {
  lang?: "en" | "bn";
};

export type IMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};
