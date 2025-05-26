import { Language } from "@prisma/client";
import ArticlesPageLayout from "../_components/page-layout/page-layout";
import { getAllArticleWithFilter, getCategories } from "@/lib/api";
import { objectToQuery } from "@/utils/query";
import { PageProps } from "@/interface/common";

const LatestPage = async ({ searchParams, params }: PageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang = resolvedParams.locale as Language;
  const filter = { ...resolvedSearchParams, lang: lang };
  const query = objectToQuery(filter);
  const categories = (await getCategories(lang)) || [];
  const data = await getAllArticleWithFilter(query, "latest");

  return (
    <ArticlesPageLayout
      title={"latestPage"}
      lang={lang}
      articles={data?.result}
      meta={data?.meta}
      categories={categories}
      columns={2}
      variant="horizontal"
      showCategory={true}
      showExcerpt={true}
    />
  );
};

export default LatestPage;
