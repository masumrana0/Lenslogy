"use client";

import ArticleGrid from "./article-grid";
import FilterSortBar from "./filter-sort-bar";
import { ArticlePreview } from "./type";

interface ViewAllLayoutProps {
  title: string;
  articles: ArticlePreview[];
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
  showReadTime?: boolean;
}

export default function ViewAllLayout({
  title,
  articles,
  categories,
  onCategoryChange,
  onSortChange,
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  showReadTime = true,
}: ViewAllLayoutProps) {
  const language = "en";
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">{title}</h1>

          <FilterSortBar
            lang={language}
            categories={categories}
            onCategoryChange={onCategoryChange}
            onSortChange={onSortChange}
          />

          <ArticleGrid
            articles={articles}
            language={language}
            columns={columns}
            variant={variant}
            showCategory={showCategory}
            showExcerpt={showExcerpt}
            showReadTime={showReadTime}
          />
        </div>
      </main>
    </>
  );
}
