import React from "react";
import Image from "next/image";
// import { Eye, ThumbsUp } from "lucide-react";
import { getServerTranslation } from "@/lib/i18n/i18n.server";
import {
  formatTimestampWithTranslation
 
} from "@/lib/translator";

const ArticleHeader: React.FC<{
  article: any;
  lang: "en" | "bn";
}> = async ({ article, lang = "en" }) => {
  const { t } = await getServerTranslation(lang);

  return (
    <header className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <span className="inline-block bg-red-500 dark:bg-red-600 text-white text-sm px-3 py-1 rounded-sm">
          {article.category.name}
        </span>

        <span className="text-gray-500 dark:text-gray-400 text-sm  ">
          {t("articleDetailsPage.publishedOn")}{" "}
          {formatTimestampWithTranslation(article.createdAt, lang)}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white">
        {article.title}
      </h1>

      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between border-b border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={article.author?.avatar || "/placeholder.svg"}
              alt={article.author?.name as string}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              {article!.author?.name}
            </h3>
            {article!.author?.designation && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {article.author?.designation}
              </p>
            )}
          </div>
        </div>

        {/* <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Eye size={16} className="mr-1" />
            <span>
              {translateNumber(article.articleAttachment.views, lang)}
            </span>{" "}
            {t("articleDetailsPage.views")}
          </div>
          <span>•</span>
          <div className="flex items-center">
            <ThumbsUp size={16} className="mr-1" />
            <span>
              {translateNumber(article.articleAttachment.likes, lang)}{" "}
              {t("articleDetailsPage.likes")}
            </span>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default ArticleHeader;
