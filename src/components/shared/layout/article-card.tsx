import Image from "next/image";
import Link from "next/link";
import { IArticle } from "@/app/[locale]/(public)/article/_interface/interface";

interface ArticleCardProps {
  article: IArticle;
  lang: "en" | "bn";
  variant?: "default" | "featured" | "compact" | "horizontal";
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export default function ArticleCard({
  article,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
}: ArticleCardProps) {
  const { title, category, date, excerpt, image, id } = article;
  // Different layouts based on variant
  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.id}`}
        className="group flex items-start space-x-3"
      >
        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            fill
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          {showCategory && category && (
            <span className="text-xs text-red-500 dark:text-red-400 block mb-1">
              {category}
            </span>
          )}
          <h3 className="font-medium text-sm leading-tight mb-1 group-hover:text-red-500 dark:text-gray-200 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/article/${id}`}
        className="group flex items-start space-x-4"
      >
        <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            fill
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          {showCategory && category && (
            <span className="text-xs text-red-500 dark:text-red-400 block mb-1">
              {category}
            </span>
          )}
          <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {title}
          </h3>
          {showExcerpt && excerpt && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 line-clamp-2">
              {excerpt}
            </p>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {date}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.id}`} className="group block">
        <div className="relative h-64 mb-4 overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            fill
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {showCategory && category && (
            <div className="absolute top-3 left-3">
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
                {category}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors">
          {title}
        </h3>
        {showExcerpt && excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-3">{excerpt}</p>
        )}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{date}</span>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/article/${id}`} className="group block">
      <div className="relative h-48 mb-3 overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          fill
          alt={article.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showCategory && category && (
          <div className="absolute top-2 left-2">
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
              {category}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors line-clamp-2">
        {article.title}
      </h3>
      {showExcerpt && excerpt && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {excerpt}
        </p>
      )}
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{date}</span>
      </div>
    </Link>
  );
}
