"use client";
import { useEffect, useRef, useState } from "react";
import { Filter, SortDesc } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterSortBar = ({ categories }: { categories: string[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");

  // Sync state from URL on mount
  useEffect(() => {
    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "newest";

    setSelectedCategory(category);
    setSelectedSort(sort);
  }, []);

  // Update query only after first mount
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    if (selectedSort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", selectedSort);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, selectedCategory, selectedSort]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start   mb-8 gap-4">
      {/* Category Filter */}
      <div className="flex   gap-2">
        <div className="flex  gap-2">
          <Filter size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-nowrap ">
            {t("common.filterBy")}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {t("common.allCategories")}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex  items-center gap-2">
        <div className="flex gap-2">
          <SortDesc size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-nowrap font-medium text-gray-700 dark:text-gray-300">
            {t("common.sortBy")}
          </span>
        </div>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-3 py-1 border-none focus:ring-2 focus:ring-red-500"
        >
          <option value="newest">{t("common.newest")}</option>
          <option value="oldest">{t("common.oldest")}</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
