import { number } from "zod";

export type IParamsProps = {
  params: Promise<{ locale: "bn" | "en" }>;
};

export type langProps = {
  lang?: "en" | "bn";
};

export type IMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};
