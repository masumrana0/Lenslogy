import { IArticleVariantCardProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { formatTimestampWithTranslation } from "@/lib/translator";
import Image from "next/image";
import Link from "next/link";

const CompactArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = false,
  lang = "en",
}: IArticleVariantCardProps) => {
  const { title, category, createdAt, image, id, baseId } = article;

  return (
    <Link
      href={`/article/${baseId}`}
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
            {category.name}
          </span>
        )}
        <h3 className="font-medium text-sm leading-tight mb-1 group-hover:text-red-500 dark:text-gray-200 dark:group-hover:text-red-400 transition-colors line-clamp-2">
          {title}
        </h3>
        {showExcerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{formatTimestampWithTranslation(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CompactArticleCard;
