import { IArticleVariantCardProps } from "@/app/[locale]/(public)/article/_interface/interface";
import Image from "next/image";
import Link from "next/link";

const FeaturedArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = true,
}: IArticleVariantCardProps) => {
  const { title, category, date, excerpt, image, id } = article;

  return (
    <Link href={`/article/${id}`} className="group block">
      <div className="relative h-64 mb-4 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
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
};

export default FeaturedArticleCard;
