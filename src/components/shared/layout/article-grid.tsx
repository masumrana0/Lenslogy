import ArticleCard from "./article-card"
import { ArticlePreview } from "./type"

 
interface ArticleGridProps {
  articles: ArticlePreview[]
  language: "en" | "bn"
  columns?: 1 | 2 | 3 | 4
  variant?: "default" | "featured" | "compact" | "horizontal"
  showCategory?: boolean
  showExcerpt?: boolean
  showReadTime?: boolean
}

export default function ArticleGrid({
  articles,
  language,
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  showReadTime = true,
}: ArticleGridProps) {
  
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
           lang={language}
          variant={variant}
          showCategory={showCategory}
          showExcerpt={showExcerpt}
          showReadTime={showReadTime}
        />
      ))}
    </div>
  )
}
