import { IArticleVariantCardProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { formatTimestampWithTranslation } from "@/lib/translator";
import Image from "next/image";
import Link from "next/link";

const DefaultArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = true,
  lang = "en",
}: IArticleVariantCardProps) => {
  return (
    <Link
      href={`/article/${article?.baseId}`}
      className="group block shadow-lg  dark:border-2 rounded"
    >
      <div className="relative h-48 mb-3 overflow-hidden">
        <Image
          src={article?.image || "/placeholder.svg"}
          fill
          alt={article?.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showCategory && article?.category && (
          <div className="absolute top-2 left-2">
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
              {article?.category?.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors line-clamp-2">
          {article?.title}
        </h3>
        {showExcerpt && article?.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
            {article?.excerpt}
          </p>
        )}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span>
            {article?.createdAt &&
              formatTimestampWithTranslation(article?.createdAt, lang)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DefaultArticleCard;
