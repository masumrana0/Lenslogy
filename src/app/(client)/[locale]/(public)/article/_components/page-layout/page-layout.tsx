import { ArticlesPageLayoutProps } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import { getServerTranslation } from "@/lib/i18n/i18n.server";
import ArticleGrid from "./article-card-grid";
import FilterSortBar from "./filter-sort-bar";

const ArticlesPageLayout = async ({
  title,
  articles,
  categories,
  lang = "en",
  columns = 3,
  variant = "default",
  showCategory = true,
  showExcerpt = true,
  meta,
}: ArticlesPageLayoutProps) => {
  // for Translation language in server side
  const { t } = await getServerTranslation(lang);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          {t(`${title}.title`)}
        </h1>

        <FilterSortBar categories={categories} />

        <ArticleGrid
          lang={lang}
          articles={articles}
          meta={meta}
          columns={columns}
          variant={variant}
          showCategory={showCategory}
          showExcerpt={showExcerpt}
        />
      </div>
    </main>
  );
};

export default ArticlesPageLayout;
