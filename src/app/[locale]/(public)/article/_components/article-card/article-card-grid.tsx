import { ArticleGridProps } from "@/app/[locale]/(public)/article/_interface/interface";
import ArticleCard from ".";

const ArticleGrid = ({
  articles,
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
}: ArticleGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          variant={variant}
          showCategory={showCategory}
          showExcerpt={showExcerpt}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
