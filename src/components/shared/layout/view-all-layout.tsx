"use client";
import FilterSortBar from "./filter-sort-bar";
import ArticleGrid from "./article-grid";
import { IArticle } from "@/app/[locale]/(public)/article/_interface/interface";
import { useTranslation } from "react-i18next";
import "@/lib/i18n/i18n.client";

interface ViewAllLayoutProps {
  title: string;
  articles: IArticle[];
  categories: string[];

  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  lang: "en" | "bn";
  showCategory?: boolean;
  showExcerpt?: boolean;
  showReadTime?: boolean;
}

export default function ViewAllLayout({
  title,
  articles,
  categories,
  lang = "en",
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  showReadTime = true,
}: ViewAllLayoutProps) {
  const { t } = useTranslation();
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            {t(`${title}.title`)}
          </h1>

          <FilterSortBar lang={lang} categories={categories} />

          <ArticleGrid
            articles={articles}
            language={lang}
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
