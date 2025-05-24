export interface IArticlesTableFilters {
  searchTerm: string;
  categoryBaseId: string;
  isPublished: string | null;
  isPinFeatured: string | null;
  isPinLatest: string | null;
  isPinHero: string | null;
  isUpComing: string | null;
  isEmergingTech: string | null;
  isHotTech: string | null;
  isFeatured: string | null;
  isGadget: string | null;
  isLatest: string | null;
  sortBy: string;
  sortOrder: string;
}
