import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface Article {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  excerpt: {
    en: string;
    bn: string;
  };
  image: string;
  category: {
    en: string;
    bn: string;
  };
  date: string;
  readTime: number;
}

interface RelatedArticlesProps {
  articles: Article[];
  language: "en" | "bn";
  title: string;
}

export default function RelatedArticles({
  articles,
  language,
  title,
}: RelatedArticlesProps) {
  // Function to get localized content
  const getLocalizedContent = (content: { en: string; bn: string }) => {
    return content[language];
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500 dark:text-white">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={getLocalizedContent(article.title)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-sm">
                      {getLocalizedContent(article.category)}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {getLocalizedContent(article.title)}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {getLocalizedContent(article.excerpt)}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{article.date}</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
