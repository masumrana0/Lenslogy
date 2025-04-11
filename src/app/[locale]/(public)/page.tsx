/* eslint-disable @typescript-eslint/no-explicit-any */
import { IParamsProps } from "@/interface/common";
import { getServerTranslation } from "@/lib/i18n/i18n.server";
import HomePage from "./_home/page";
// import { translateText } from "@/lib/translator";

const Page = async ({ params }: IParamsProps) => {
  const resolvedParams = await params;
  const { t } = await getServerTranslation(resolvedParams.locale || "en");

  // const res = await fetch(
  //   "https://newsapi.org/v2/everything?q=tesla&from=2025-03-10&sortBy=publishedAt&apiKey=28d3f131a7dd4b6cbb44ba004f4434f3"
  // );
  // const data = await res.json();

  // Process articles and resolve translations
  // const processedData = await Promise.all(
  //   data.articles.slice(1,26).map(async (article: any) => {
  //     const translatedTitle = await translateText(
  //       article.title,
  //       resolvedParams.locale
  //     );
  //     const translatedDescription = await translateText(
  //       article.description,
  //       resolvedParams.locale
  //     );
  //     return {
  //       ...article,
  //       title: translatedTitle,
  //       description: translatedDescription,
  //     };
  //   })
  // );

  // console.log("Processed Data:", processedData);

  return (
    <>
      {/* <h1>{t("greeting")}</h1> */}

      <HomePage />
    </>
  );
};

export default Page;
