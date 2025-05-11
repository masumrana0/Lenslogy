"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { INavDropdown } from "../interface";

const DeskNavDropdown: React.FC<{ menu: INavDropdown; lang: "en" | "bn" }> = ({
  menu,
  lang = "en",
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuKey = menu.type === "dropdown" ? menu.label.en : null;
  const isOpen = activeMenu === menuKey;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Toggle for mobile, hover for desktop
  const handleToggle = () => setActiveMenu(isOpen ? null : menuKey);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setActiveMenu(menuKey)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <button
        onClick={handleToggle}
        className={cn(
          "font-medium flex items-center hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400",
          isOpen && "text-red-500 dark:text-red-400"
        )}
      >
        {menu.label[lang]}
        <ChevronDown
          size={16}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* it's for desktop */}

      {isOpen && menu.type === "dropdown" && (
        <div className="fixed left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto p-4 grid grid-cols-2 gap-6">
            {menu.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-sm uppercase mb-3 border-b pb-1 border-gray-200 dark:border-gray-700 dark:text-gray-200">
                  {lang === "bn" ? section.title.bn : section.title.en}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${menuKey}/${item.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-20 h-16 bg-gray-100 dark:bg-gray-700 overflow-hidden rounded">
                        <Image
                          src={item.image}
                          width={120}
                          height={80}
                          alt={item.title.en}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-red-500 dark:text-red-400">
                          {item.category[lang]}
                        </span>
                        <h4 className="text-sm font-medium leading-tight group-hover:text-red-500 dark:text-gray-200 dark:group-hover:text-red-400">
                          {item.title[lang]}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.createdAt}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskNavDropdown;
