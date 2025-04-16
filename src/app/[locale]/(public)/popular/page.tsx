"use client";

import { useState, useEffect } from "react";

import { popularArticlesData } from "@/lib/data";
import { getText } from "@/lib/utils";
import { ArticlePreview } from "@/components/shared/layout/type";
import ViewAllLayout from "@/components/shared/layout/view-all-layout";

export default function PopularPage() {
  const language: "en" | "bn" = "en";
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticlePreview[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);

  // Initialize articles and categories
  useEffect(() => {
    const articlesData = popularArticlesData[language];

    // Convert to ArticlePreview format
    const formattedArticles: ArticlePreview[] = articlesData.map((article) => ({
      id: article.id.toString(),
      title: {
        en: language === "en" ? article.title : "",
        bn: article.title,
      },
      image: article.image,
      category: {
        en: language === "en" ? article.category : "",
        bn: article.category,
      },
      date: article.date,
      readTime: article.readTime,
    }));

    setArticles(formattedArticles);
    setFilteredArticles(formattedArticles);

    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(articlesData.map((article) => article.category))
    );
    setCategories(uniqueCategories);
  }, [language]);

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.category &&
          (article.category.en === category || article.category.bn === category)
      );
      setFilteredArticles(filtered);
    }
  };

  // Handle sort
  const handleSortChange = (sort: string) => {
    const sorted = [...filteredArticles];

    switch (sort) {
      case "newest":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "readTime":
        sorted.sort((a, b) => (b.readTime || 0) - (a.readTime || 0));
        break;
    }

    setFilteredArticles(sorted);
  };

  return (
    <ViewAllLayout
      title={getText("popularThisWeek", language)}
      articles={filteredArticles}
      categories={categories}
      onCategoryChange={handleCategoryChange}
      onSortChange={handleSortChange}
      columns={3}
      variant="compact"
      showCategory={true}
      showExcerpt={false}
      showReadTime={true}
    />
  );
}
