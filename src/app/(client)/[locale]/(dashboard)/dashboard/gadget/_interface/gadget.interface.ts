import { GadgetFormData } from "@/schama/gadget-schema";
import { Gadget } from "@prisma/client";
import { SetStateAction } from "react";

export interface IGadgetFilters {
  searchTerm?: string;
  brandBaseId?: string;
  typeBaseId?: string;
  isPublished?: boolean;
  isPinFeatured?: boolean;
  isPinLatest?: boolean;
  isPinNav?: boolean;
  isPinHero?: boolean;
  isUpComing?: boolean;
  isEmergingTech?: boolean;
  isHotTech?: boolean;
  isFeatured?: boolean;
  isGadget?: boolean;
  isLatest?: boolean;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "desc" | "asc";
  page?: number;
  limit?: number;
  lang?: "en" | "bn";
}

export interface IGadgetFormProps {
  mode?: "create" | "update";
  gadget?: Partial<GadgetFormData | any>;
  setIsEditOpen?: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      gadget: GadgetFormData | null | any;
    }>
  >;
}
