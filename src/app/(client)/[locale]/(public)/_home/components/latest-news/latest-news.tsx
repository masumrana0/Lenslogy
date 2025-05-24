import CompactArticleCard from "../../../article/_components/article-card/compact-card";
import ViewAll from "../vew-all";
import DefaultArticleCard from "../../../article/_components/article-card/default-card";
import { IArticle } from "../../../article/_interface/interface";

const LatestNews = ({
  lang = "en",
  articles = [],
}: {
  lang?: "en" | "bn";
  articles: IArticle[];
}) => {
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section className="py-8 border-t">
      <ViewAll href="latest" title="Latest News" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/*  latest article */}
        <DefaultArticleCard
          lang={lang}
          article={mainArticle}
          showCategory
          showExcerpt
        />

        {/* Other latest articles */}
        <div className="space-y-6">
          {otherArticles.map((article) => (
            <CompactArticleCard
              lang={lang}
              article={article}
              key={article.id}
              showCategory
              showExcerpt
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
