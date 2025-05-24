"use client";
import { useEffect, useRef, useState } from "react";
import { Filter, SortDesc } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import Limit from "@/components/shared/pagination/limit";
import { cn } from "@/lib/utils";

const DEFAULT_CATEGORY = "all";
const DEFAULT_SORT = "newest";
const DEFAULT_LIMIT = 10;

const FilterSortBar = ({ categories }: { categories: Category[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasMounted = useRef(false);

  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  // Sync initial values from URL
  useEffect(() => {
    const category = searchParams.get("categoryBaseId") || DEFAULT_CATEGORY;
    const sort = searchParams.get("sort") || DEFAULT_SORT;
    const limitParam = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    setSelectedCategory(category);
    setSelectedSort(sort);
    setLimit(limitParam);
  }, [searchParams]);

  // Push query parameters on change (after mount)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const params = new URLSearchParams();

    if (selectedCategory !== DEFAULT_CATEGORY) {
      params.set("categoryBaseId", selectedCategory);
    }
    if (selectedSort !== DEFAULT_SORT) {
      params.set("sort", selectedSort);
    }
    if (limit !== DEFAULT_LIMIT) {
      params.set("limit", limit.toString());
    }

    // Always reset to first page
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }, [selectedCategory, selectedSort, limit, pathname, router]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
      {/* Filter Section */}
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {t("common.filterBy")}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { baseId: DEFAULT_CATEGORY, name: t("common.allCategories") },
            ...categories,
          ].map((category) => (
            <button
              key={category.baseId}
              onClick={() => setSelectedCategory(category.baseId)}
              className={cn(
                "px-3 py-1 text-sm rounded-full transition-colors",
                selectedCategory === category.baseId
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Limit Section */}
      <div className="flex items-center gap-5">
        <Limit
          limit={limit}
          onLimitChange={(value) => setLimit(Number(value))}
        />
        <div className="flex items-center gap-2">
          <SortDesc size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {t("common.sortBy")}
          </span>
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
    </div>
  );
};

export default FilterSortBar;
