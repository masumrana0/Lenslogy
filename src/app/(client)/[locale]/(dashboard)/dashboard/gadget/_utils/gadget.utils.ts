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

export const gadgetDefaultValue = {
  typeId: "",
  brandId: "",
  model: "",
  releaseDate: null,
  title: "",
  excerpt: "",
  content: "",
  image: "",
  images: [],
  isGadget: true,
  isFeatured: false,
  isPinFeatured: false,
  isPinLatest: false,
  isLatest: false,
  isPinHero: false,
  isPinNav: false,
  isPublished: false,
  isUpComing: false,
  isEmergingTech: false,
  isHotTech: false,
};
