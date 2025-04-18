import { IArticleVariantCardProps } from "@/app/[locale]/(public)/article/_interface/interface";
import Image from "next/image";
import Link from "next/link";

const HorizontalArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = true,
}: IArticleVariantCardProps) => {
  const { title, category, date, excerpt, image, id } = article;

  return (
    <Link href={`/article/${id}`} className="group flex items-start space-x-4">
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
        <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
      </div>
    </Link>
  );
};

export default HorizontalArticleCard;
