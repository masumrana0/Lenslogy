"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { INavDropdown } from "../interface";

const NavMobileDropdown: React.FC<{
  menu: INavDropdown;
  lang: "en" | "bn";
}> = ({ menu, lang = "en" }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuKey = menu.type === "dropdown" ? menu.label.en : null;
  const isOpen = activeMenu === menuKey;

  

  // Toggle for mobile, hover for desktop
  const handleToggle = () => setActiveMenu(isOpen ? null : menuKey);
  return (
    <div>
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
      >
        {menu.label[lang]}
        <ChevronDown
          size={16}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && menu.type === "dropdown" && (
        <div className="pl-8 py-2 space-y-2 bg-gray-50 dark:bg-gray-800">
          {menu.sections.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="px-4 py-1 font-bold text-sm dark:text-gray-300">
                {" "}
                {section.title[lang]}
              </h4>
              <div className="space-y-2 mt-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/gadgets/${item.id}`}
                    className="block px-4 py-1 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                    // onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title[lang]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMobileDropdown;
