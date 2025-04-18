"use client";
import { ArticleCardProps } from "@/app/[locale]/(public)/article/_interface/interface";
import DefaultArticleCard from "./default-card";
import FeaturedArticleCard from "./featured-card";
import HorizontalArticleCard from "./horizontal-card";
import CompactArticleCard from "./compact-card";

const ArticleCard = ({
  article,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
}: ArticleCardProps) => {
  // Different layouts based on variant
  if (variant === "compact") {
    return <CompactArticleCard article={article} showCategory={showCategory} />;
  }

  if (variant === "horizontal") {
    return (
      <HorizontalArticleCard
        article={article}
        showCategory={showCategory}
        showExcerpt={showExcerpt}
      />
    );
  }

  if (variant === "featured") {
    return (
      <FeaturedArticleCard
        article={article}
        showCategory={showCategory}
        showExcerpt={showExcerpt}
      />
    );
  }

  // Default card
  return (
    <DefaultArticleCard
      article={article}
      showCategory={showCategory}
      showExcerpt={showExcerpt}
    />
  );
};

export default ArticleCard;
