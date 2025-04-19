type LocalizedString = {
  en: string;
  bn: string;
};

interface MenuItem {
  id: number;
  title: LocalizedString;
  image: string;
  category: LocalizedString;
  date: string;
}

interface MenuSection {
  title: LocalizedString;
  items: MenuItem[];
}

// A nav entry is either a simple link or a dropdown
interface NavLink {
  type: "link";
  label: LocalizedString;
  href: string;
}

export interface INavDropdown {
  type: "dropdown";
  label: LocalizedString;
  sections: MenuSection[];
}

export type INavItem = NavLink | INavDropdown;
