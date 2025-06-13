export interface ISideBarNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
  children?: ISideBarNavItem[];
}
