"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { INavDropdown } from "../interface";
import { useTranslation } from "react-i18next";
import { formatTimestampWithTranslation } from "@/lib/translator";

const DeskNavDropdown: React.FC<{ menu: INavDropdown; lang: "en" | "bn" }> = ({
  menu,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuKey = menu.type === "dropdown" ? menu.label : null;
  const isOpen = activeMenu === menuKey;
  const { t } = useTranslation();

  // Clear any existing timeout
  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle mouse enter on trigger
  const handleMouseEnter = () => {
    clearHoverTimeout();
    setActiveMenu(menuKey);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  // Handle dropdown content mouse enter
  const handleDropdownMouseEnter = () => {
    clearHoverTimeout();
  };

  // Handle dropdown content mouse leave
  const handleDropdownMouseLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, []);

  // Toggle for mobile, hover for desktop
  const handleToggle = () => setActiveMenu(isOpen ? null : menuKey);
  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleToggle}
        className={cn(
          "font-medium flex items-center hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400 transition-colors duration-200",
          isOpen && "text-red-500 dark:text-red-400"
        )}
      >
        {t(`navbar.${menuKey}.label`)}
        <ChevronDown
          size={16}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* it's for desktop */}

      {isOpen && menu.type === "dropdown" && (
        <div
          ref={dropdownRef}
          className="fixed left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700 animate-in fade-in-0 slide-in-from-top-1 duration-200"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="container mx-auto p-4 grid grid-cols-2 gap-6">
            {menu.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-sm uppercase mb-3 border-b pb-1 border-gray-200 dark:border-gray-700 dark:text-gray-200">
                  {t(`navbar.${menuKey}.sub.${section.title}`)}
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
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-red-500 dark:text-red-400">
                          {item.category.name}
                        </span>
                        <h4 className="text-sm font-medium leading-tight group-hover:text-red-500 dark:text-gray-200 dark:group-hover:text-red-400">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestampWithTranslation(item.createdAt)}
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
