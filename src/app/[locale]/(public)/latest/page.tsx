// "use client";
// import { useState, useEffect } from "react";
// import { latestNewsData } from "@/lib/data";
// import { ArticlePreview } from "@/components/shared/layout/type";
// import ViewAllLayout from "@/components/shared/layout/view-all-layout";

// export default function LatestNewsPage() {
//   const language: "en" | "bn" = "en";
//   const [articles, setArticles] = useState<ArticlePreview[]>([]);
//   const [filteredArticles, setFilteredArticles] = useState<ArticlePreview[]>(
//     []
//   );
//   const [categories, setCategories] = useState<string[]>([]);

//   // Initialize articles and categories
//   useEffect(() => {
//     const articlesData = latestNewsData[language];

//     // Convert to ArticlePreview format
//     const formattedArticles: ArticlePreview[] = articlesData.map((article) => ({
//       id: article.id.toString(),
//       title: {
//         en: language === "en" ? article.title : "",
//         bn: article.title,
//       },
//       excerpt: {
//         en: language === "en" ? article.excerpt : "",
//         bn: article.excerpt,
//       },
//       image: article.image,
//       category: {
//         en: language === "en" ? article.category : "",
//         bn: article.category,
//       },
//       date: article.date,
//     }));

//     setArticles(formattedArticles);
//     setFilteredArticles(formattedArticles);

//     // Extract unique categories
//     const uniqueCategories = Array.from(
//       new Set(articlesData.map((article) => article.category))
//     );
//     setCategories(uniqueCategories);
//   }, [language]);

//   // Handle category filter
//   const handleCategoryChange = (category: string) => {
//     if (category === "all") {
//       setFilteredArticles(articles);
//     } else {
//       const filtered = articles.filter(
//         (article) =>
//           article.category &&
//           (article.category.en === category || article.category.bn === category)
//       );
//       setFilteredArticles(filtered);
//     }
//   };

//   // Handle sort
//   const handleSortChange = (sort: string) => {
//     const sorted = [...filteredArticles];

//     switch (sort) {
//       case "newest":
//         sorted.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         break;
//       case "oldest":
//         sorted.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//         );
//         break;
//     }

//     setFilteredArticles(sorted);
//   };

//   return (
//     <ViewAllLayout
//       title={"latestNews"}
//       lang={language}
//       articles={filteredArticles}
//       categories={categories}
//       onCategoryChange={handleCategoryChange}
//       onSortChange={handleSortChange}
//       columns={2}
//       variant="horizontal"
//       showCategory={true}
//       showExcerpt={true}
//     />
//   );
// }

import React from "react";

const LatestArticle = () => {
  return (
    <div>
      <h3>Latest Article page</h3>
    </div>
  );
};

export default LatestArticle;
