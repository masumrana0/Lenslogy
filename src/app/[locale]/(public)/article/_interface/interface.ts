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
  author: Author;
  date: string;
  tags?: string[];
  views: number;
  likes: number;
}
