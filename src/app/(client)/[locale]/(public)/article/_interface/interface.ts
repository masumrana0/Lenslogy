import { IMeta } from "@/interface/common";
import { Category } from "@prisma/client";

export type IPageProps = {
  params: Promise<{ locale: "bn" | "en"; baseId: string }>;
};

interface Author {
  name: string;
  designation: string;
  avatar: string;
  role: string;
}

interface IArticleAttachment {
  views: string;
  likes: string;
  articleId: string;
  ipAddress: string;
}

export interface IArticle {
  id: string | number;
  title: string;
  baseId: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: Author;
  createdAt: string;
  tags?: string[];
  articleAttachment: IArticleAttachment;
}

export interface RelatedArticlesProps {
  lang: "en" | "bn";
  title: string;
  category: string;
}

// for Card

export interface ArticlesPageLayoutProps {
  title: string;
  articles: IArticle[];
  categories: Category[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  lang: "en" | "bn";
  showCategory?: boolean;
  showExcerpt?: boolean;
  meta?: IMeta;
}

export interface ArticleGridProps {
  articles: IArticle[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
  lang: "en" | "bn";
  meta?: IMeta;
}

export interface ArticleCardProps {
  article: IArticle;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
  lang: "en" | "bn";
}

export interface IArticleVariantCardProps {
  article: IArticle;
  showCategory?: boolean;
  showExcerpt?: boolean;
  lang: "en" | "bn";
}
