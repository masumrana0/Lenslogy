import { ISideBarNavItem } from "@/interface/dashboard-nav-interface";
import {
  BarChart3,
  FileText,
  FolderPlus,
  Home,
  PlusCircle,
  Settings,
  Smartphone,
  Tag,
  Users,
} from "lucide-react";

export const sideNavItemsContent: ISideBarNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
  },
  {
    title: "Articles",
    href: "/dashboard/articles",
    icon: FileText,
    roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
    children: [
      {
        title: "All Articles",
        href: "/dashboard/articles",
        icon: FileText,
        roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
      },
      {
        title: "Create Article",
        href: "/dashboard/articles/new",
        icon: PlusCircle,
        roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
      },
    ],
  },
  {
    title: "Gadgets",
    href: "/dashboard/gadgets",
    icon: Smartphone,
    roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
    children: [
      {
        title: "All Gadgets",
        href: "/dashboard/gadgets",
        icon: Smartphone,
        roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
      },
      {
        title: "Create Gadget",
        href: "/dashboard/gadgets/create",
        icon: PlusCircle,
        roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
      },
    ],
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: FolderPlus,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Tags",
    href: "/dashboard/tags",
    icon: Tag,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
  },
];
