import { Language } from "@prisma/client";
import ArticlesPageLayout from "../_components/page-layout/page-layout";
import { getAllArticleWithFilter, getCategories } from "@/lib/api";
import { objectToQuery } from "@/utils/query";

const LatestPage = async ({
  searchParams,
  params,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const lang = params.locale as Language;
  const filter = { ...searchParams, lang: lang, isLatest: true };

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
