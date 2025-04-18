export type IPageProps = {
  params: Promise<{ locale: "bn" | "en"; id: string }>;
};

interface Author {
  name: string;
  image: string;
  role: string;
}

export interface IArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  author?: Author;
  date: string;
  tags?: string[];
  views?: number;
  likes?: number;
}
export interface ArticleGridProps {
  articles: IArticle[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface ArticleCardProps {
  article: IArticle;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface IArticleVariantCardProps {
  article: IArticle;
  showCategory?: boolean;
  showExcerpt?: boolean;
}
