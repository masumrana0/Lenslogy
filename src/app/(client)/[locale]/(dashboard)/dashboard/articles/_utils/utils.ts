"use client";

import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { IArticleFilters } from "../interface/article.interface";

export const articleBooleanFields = [
  {
    name: "isPublished",
    label: "Publish",
    desc: "Make article publicly visible",
  },
  { name: "isFeatured", label: "Featured", desc: "Feature on homepage" },
  {
    name: "isPinFeatured",
    label: "Pin to Featured",
    desc: "Pin at featured articles top",
  },
  {
    name: "isPinLatest",
    label: "Pin to Latest",
    desc: "Pin at latest articles top",
  },
  {
    name: "isPinHero",
    label: "Pin to Hero",
    desc: "Pin to top hero section",
  },
  { name: "isUpComing", label: "Upcoming", desc: "Mark as upcoming feature" },
  {
    name: "isEmergingTech",
    label: "Emerging Tech",
    desc: "Emerging technology tag",
  },
  {
    name: "isHotTech",
    label: "Hot Tech",
    desc: "Trending hot technology tag",
  },
  { name: "isGadget", label: "Gadget", desc: "Categorized as Gadget" },
] as const;

export const articleBooleanFilterKeys: (keyof IArticleFilters)[] = [
  "isPublished",
  "isFeatured",
  "isPinFeatured",
  "isPinLatest",
  "isPinHero",
  "isPinNav",
  "isUpComing",
  "isEmergingTech",
  "isHotTech",
  "isGadget",
];

export const articleBooleanFieldsForUI = [
  {
    name: "isPublished",
    label: "is article published",
    desc: "Make article publicly visible",
  },
  {
    name: "isFeatured",
    label: "is article featured",
    desc: "Highlight in featured section",
  },
  {
    name: "isPinFeatured",
    label: "is article pinned to featured",
    desc: "Feature in featured for showing featured articles",
  },
  {
    name: "isPinLatest",
    label: "Pin to Latest",
    desc: "Highlight in latest news",
  },
  {
    name: "isPinHero",
    label: "is article pinned to hero",
    desc: "Feature in top hero banner",
  },
  {
    name: "isPinNav",
    label: "is article pinned to navbar",
  },
  {
    name: "isGadget",
    label: "is article gadget",
    desc: "Tag as gadget article",
  },
  {
    name: "isLatest",
    label: "is article latest",
    desc: "Tag as latest article",
  },
  {
    name: "isEmergingTech",
    label: "is article emerging tech",
    desc: "Tag as emerging tech article",
  },
  {
    name: "isHotTech",
    label: "is article hot tech",
    desc: "Tag as hot tech article",
  },
  {
    name: "isUpComing",
    label: "is article upcoming",
    desc: "Tag as upcoming release",
  },
];

export const articleResetState = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  categoryBaseId: "",
  categoryId: "",
  isPublished: false,
  isFeatured: false,
  isPinFeatured: false,
  isPinLatest: false,
  isPinHero: false,
  isUpComing: false,
  isEmergingTech: false,
  isHotTech: false,
  isGadget: false,
  isLatest: false,
};
