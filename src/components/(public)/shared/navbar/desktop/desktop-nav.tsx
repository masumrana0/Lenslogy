"use client";
import Link from "next/link";
import React from "react";
import DeskNavDropdown from "./nav-desk-dropdown";
import { INavItem } from "../interface";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";

const DesktopNav: React.FC<{
  items: INavItem[];
}> = ({ items }) => {
  const { locale } = useParams();
  const lang = locale === "en" || locale === "bn" ? locale : "en";
  const { t } = useTranslation();

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
              {t(`navbar.${item.label}`)}
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
