import { IGadgetFilters } from "../_interface/gadget.interface";

export const gadgetFilterInitialState: IGadgetFilters = {
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 10,
};

export const gadgetBooleanFilterKeys = [
  "isPublished",
  "isFeatured",
  "isPinFeatured",
  "isPinLatest",
  "isPinHero",
  "isPinNav",
  "isUpComing",
  "isEmergingTech",
  "isHotTech",
];
