import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
 interface MenuSection {
  title: string;
  items: IArticle[];
}

 
interface NavLink {
  type: "link";
  label: string;
  href: string;
}

export interface INavDropdown {
  type: "dropdown";
  label: string;
  sections: MenuSection[];
}

export type INavItem = NavLink | INavDropdown;

export interface INavGadget {
  upcoming: IArticle[];
  latest: IArticle[];
}

export interface INavHotTech {
  ai: IArticle[];
  emerging: IArticle[];
}

export interface INavContent {
  navHotTech: INavHotTech;
  navGadget: INavGadget;
}
