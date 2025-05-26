import Link from "next/link";
import React from "react";
import DeskNavDropdown from "./nav-desk-dropdown";

import { Language } from "@prisma/client";
import { INavItem } from "@/interface/nav-interface";

const DesktopNav: React.FC<{
  items: INavItem[];
  lang: Language;
}> = ({ items, lang = "en" }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {items.map((item, index) => {
        if (item.type === "link") {
          return (
            <Link
              key={index}
              href={item.href}
              className="font-medium hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400"
            >
              {item.label}
            </Link>
          );
        } else if (item.type === "dropdown") {
          return <DeskNavDropdown key={index} menu={item} lang={lang} />;
        }
      })}
    </nav>
  );
};

export default DesktopNav;
