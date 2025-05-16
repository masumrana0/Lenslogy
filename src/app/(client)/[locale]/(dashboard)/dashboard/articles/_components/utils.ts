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
