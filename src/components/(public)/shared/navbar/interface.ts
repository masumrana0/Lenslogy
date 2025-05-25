import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";

interface MenuSection {
  title: string;
  items: IArticle[];
}

// A nav entry is either a simple link or a dropdown
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
