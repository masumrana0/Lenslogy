import { Language } from "@prisma/client";
import ArticlesPageLayout from "../_components/page-layout/page-layout";
import { getAllArticleWithFilter, getCategories } from "@/lib/api";
import { objectToQuery } from "@/utils/query";
import { PageProps } from "@/interface/common";


const FeaturedPage = async ({ searchParams, params }: PageProps) => {
  const lang = (await params).locale as Language;
  const resolvedSearchParams = await searchParams;
  const filter = { ...resolvedSearchParams, lang: lang, isFeatured: true };
  const query = objectToQuery(filter);
  const categories = (await getCategories(lang)) || [];
  const data = await getAllArticleWithFilter(query, "featured");

  return (
    <ArticlesPageLayout
      title={"featuredPage"}
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

export default FeaturedPage;
