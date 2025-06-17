import { Article } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IArticleFilters {
  searchTerm?: string;
  categoryBaseId?: string;
  isPublished?: boolean;
  isPinFeatured?: boolean;
  isPinLatest?: boolean;
  isPinHero?: boolean;
  isUpComing?: boolean;
  isEmergingTech?: boolean;
  isHotTech?: boolean;
  isFeatured?: boolean;
  isPinNav?: boolean;
  isGadget?: boolean;
  isLatest?: boolean;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "desc" | "asc";
  page?: number;
  limit?: number;
  lang?: "en" | "bn";
}

export interface IArticleFormProps {
  article?: Article;
  mode?: "create" | "update";
  setIsEditOpen?: Dispatch<
    SetStateAction<{ state: boolean; article: any | null }>
  >;
}
