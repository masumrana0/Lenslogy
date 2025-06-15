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
