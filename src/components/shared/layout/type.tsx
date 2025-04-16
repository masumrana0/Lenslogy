export interface LocalizedContent {
  en: string;
  bn: string;
}

export interface Author {
  name: string;
  image: string;
  role: LocalizedContent;
}

export interface Comment {
  id: number;
  author: string;
  date: string;
  content: LocalizedContent;
}

export interface ArticlePreview {
  id: string;
  title: LocalizedContent;
  excerpt?: LocalizedContent;
  image: string;
  category?: LocalizedContent;
  date: string;
  readTime?: number;
  rating?: number;
}

export interface Article extends ArticlePreview {
  content: LocalizedContent;
  author: Author;
  tags: string[];
  views: number;
  likes: number;
  comments: Comment[];
}
