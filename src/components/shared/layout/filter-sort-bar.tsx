"use client";
import { useState } from "react";
import { Filter, SortDesc } from "lucide-react";

interface FilterSortBarProps {
  lang?: "en" | "bn";
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterSortBar({
  lang = "en",
  categories,
  onCategoryChange,
  onSortChange,
}: FilterSortBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("newest");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {lang === "en" ? "Filter by:" : "বিভাগ অনুযায়ী ফিল্টার করুন:"}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {/* {getText("allCategories", lang)}
             */}
            {lang === "en" ? "All Categories" : "সব বিভাগ"}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
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

      <div className="flex items-center gap-2">
        <SortDesc size={18} className="text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {/* {getText("sortBy", lang)}:
           */}
          {lang === "en" ? "Sort by:" : "সাজান:"}
        </span>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-3 py-1 border-none focus:ring-2 focus:ring-red-500"
        >
          <option value="newest">
            {/* {getText("newest", lang)} */}
            {lang === "en" ? "Newest" : "নতুনতম"}
          </option>
          <option value="oldest">
            {/* {getText("oldest", lang)} */}
            {lang === "en" ? "Oldest" : "পুরনোতম"}
          </option>

          {lang === "en" ? "Most Popular" : "সবচেয়ে জনপ্রিয়"}
          <option value="rating">
            {/* {getText("highestRated", lang)} */}
            {lang === "en" ? "Highest Rated" : "সর্বোচ্চ রেটেড"}
          </option>
        </select>
      </div>
    </div>
  );
}
