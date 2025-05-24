import { IArticleVariantCardProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { formatTimestampWithTranslation } from "@/lib/translator";
import Image from "next/image";
import Link from "next/link";

const FeaturedArticleCard = ({
  article,
  showCategory = true,
  showExcerpt = true,
  lang = "en",
}: IArticleVariantCardProps) => {
  return (
    <Link href={`/article/${article?.baseId}`} className="group block">
      <div className="relative h-64 mb-4 overflow-hidden">
        <Image
          src={article?.image || "/placeholder.svg"}
          fill
          alt={article?.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showCategory && article?.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
              {article?.category?.name}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-400 transition-colors">
        {article?.title}
      </h3>
      {showExcerpt && article?.excerpt && (
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {article?.excerpt}
        </p>
      )}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          {article?.createdAt &&
            formatTimestampWithTranslation(article?.createdAt, lang)}
        </span>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;
