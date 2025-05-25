import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { INavItem } from "./interface";

interface NavGadget {
  upcoming: IArticle[];
  latest: IArticle[];
}

interface NavHotTech {
  ai: IArticle[];
  emerging: IArticle[];
}

interface IPram {
  navHotTech: NavHotTech;
  navGadget: NavGadget;
}

export const ReadyNavMenu = (data: IPram): INavItem[] => {
  const ai = data.navHotTech.ai || [];
  const em = data.navHotTech.emerging || [];
  const upcoming = data.navGadget.upcoming || [];
  const latest = data.navGadget.latest || [];
  const navMenu: INavItem[] = [
    {
      type: "link",
      label: "mobiles",
      href: "/mobiles",
    },
    {
      type: "dropdown",
      label: "gadgets",
      sections: [
        {
          title: "latest",
          items: [...latest],
        },
        {
          title: "upcoming",
          items: [...upcoming],
        },
      ],
    },
    {
      type: "dropdown",
      label: "hotTech",
      sections: [
        {
          title: "ai",
          items: [...ai],
        },
        {
          title: "emerging",
          items: [...em],
        },
      ],
    },
    {
      type: "link",
      label: "contact",
      href: "/contact",
    },
  ];

  return navMenu;
};
