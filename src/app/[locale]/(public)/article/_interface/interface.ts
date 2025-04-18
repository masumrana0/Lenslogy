export type IPageProps = {
  params: Promise<{ locale: "bn" | "en"; id: string }>;
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
}

export interface IArticle {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  date: string;
  tags?: string[];
  articleAttachment: IArticleAttachment;
}

export interface RelatedArticlesProps {
  lang: "en" | "bn";
  title: string;
  category: string;
}

// for Card

export interface IArticleForCard {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export interface ArticlesPageLayoutProps {
  title: string;
  articles: IArticleForCard[];
  categories: string[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  lang: "en" | "bn";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface ArticleGridProps {
  articles: IArticleForCard[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface ArticleCardProps {
  article: IArticleForCard;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export interface IArticleVariantCardProps {
  article: IArticleForCard;
  showCategory?: boolean;
  showExcerpt?: boolean;
}
