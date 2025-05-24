import { IArticleVariantCardProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { formatTimestampWithTranslation } from "@/lib/translator";
import Image from "next/image";
import Link from "next/link";

const HorizontalArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = true,
  lang = "en",
}: IArticleVariantCardProps) => {
  return (
    <Link
      href={`/article/${article?.baseId}`}
      className="group flex items-start space-x-4"
    >
      <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
        <Image
          src={article?.image || "/placeholder.svg"}
          fill
          alt={article?.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1">
        {showCategory && article?.category && (
          <span className="text-xs text-red-500 dark:text-red-400 block mb-1">
            {article?.category.name}
          </span>
        )}
        <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors line-clamp-2">
          {article?.title}
        </h3>
        {showExcerpt && article?.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 line-clamp-2">
            {article?.excerpt}
          </p>
        )}
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {article?.createdAt &&
            formatTimestampWithTranslation(article?.createdAt, lang)}
        </span>
      </div>
    </Link>
  );
};

export default HorizontalArticleCard;
