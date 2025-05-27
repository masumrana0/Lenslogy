import React from "react";
import ViewAll from "../vew-all";
import { IArticle } from "../../../article/_interface/interface";
import DefaultArticleCard from "../../../article/_components/article-card/default-card";

const FeaturedSection = ({
  lang = "en",
  articles,
}: {
  lang?: "en" | "bn";
  articles: IArticle;
}) => {
  const featuredArticles = articles || [];
  return (
    <section className="py-8 border-t border-b">
      <ViewAll title="Featured Blog" href="featured" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(featuredArticles) &&
          featuredArticles.map((article: IArticle) => (
            <DefaultArticleCard
              lang={lang}
              article={article}
              key={article.id}
              showCategory
              showExcerpt
            />
          ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
