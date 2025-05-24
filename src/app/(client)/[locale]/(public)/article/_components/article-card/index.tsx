"use client";
import { ArticleCardProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import CompactArticleCard from "./compact-card";
import DefaultArticleCard from "./default-card";
import FeaturedArticleCard from "./featured-card";
import HorizontalArticleCard from "./horizontal-card";

const ArticleCard = ({
  article,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  lang = "en",
}: ArticleCardProps) => {
  // Different layouts based on variant
  if (variant === "compact") {
    return (
      <CompactArticleCard
        lang={lang}
        article={article}
        showCategory={showCategory}
      />
    );
  }

  if (variant === "horizontal") {
    return (
      <HorizontalArticleCard
        lang={lang}
        article={article}
        showCategory={showCategory}
        showExcerpt={showExcerpt}
      />
    );
  }

  if (variant === "featured") {
    return (
      <FeaturedArticleCard
        lang={lang}
        article={article}
        showCategory={showCategory}
        showExcerpt={showExcerpt}
      />
    );
  }

  // Default card
  return (
    <DefaultArticleCard
      lang={lang}
      article={article}
      showCategory={showCategory}
      showExcerpt={showExcerpt}
    />
  );
};

export default ArticleCard;
