import { formatTimestampWithTranslation } from "@/lib/translator";
import Image from "next/image";
import Link from "next/link";
import { IArticle } from "../../../article/_interface/interface";

const HeroSection = ({
  lang = "en",
  articles,
}: {
  lang?: "en" | "bn";
  articles: IArticle[];
}) => {
  const mainArticle = articles[0];

  const sideArticles = articles.slice(1);
 
  return (
    <section className="grid items-center grid-cols-1 md:grid-cols-3 gap-4 pt-6 pb-10">
      {/* Main featured article */}
      <div className="md:col-span-2 relative group">
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src={mainArticle?.image || "/placeholder.svg"}
            fill
            alt={mainArticle?.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 mb-2">
            {mainArticle?.category?.name}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-red-400 transition-colors">
            <Link href={`/article/${mainArticle?.baseId}`}>
              {mainArticle?.title}
            </Link>
          </h2>
          {mainArticle?.excerpt && (
            <p className="text-gray-200 mb-2 line-clamp-2">
              {mainArticle?.excerpt}
            </p>
          )}
          <span className="text-sm text-gray-300">
            {formatTimestampWithTranslation(mainArticle?.createdAt, lang)}
          </span>
        </div>
      </div>

      {/* Side articles */}
      <div className="space-y-4">
        {sideArticles.map((article) => (
          <div key={article.id} className="relative h-[193px] group">
            <div className="relative h-full overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                fill
                alt={article.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 mb-2">
                {article?.category?.name}
              </span>
              <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">
                <Link href={`/article/${article?.baseId}`}>
                  {article.title}
                </Link>
              </h3>
              <span className="text-sm text-gray-300">
                {formatTimestampWithTranslation(article.createdAt, lang)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
