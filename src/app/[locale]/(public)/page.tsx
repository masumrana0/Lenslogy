/* eslint-disable @typescript-eslint/no-explicit-any */
import { IParamsProps } from "@/interface/common";
import { getServerTranslation } from "@/lib/i18n/i18n.server";

import HeroSection from "./_home/components/hero-section";
import FeaturedSection from "./_home/components/featured-section";
import PopularSection from "./_home/components/popular-section";
import LatestNews from "./_home/components/latest-news";
import ReviewsSection from "./_home/components/reviews-section"; 
const Page = async ({ params }: IParamsProps) => {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen">
      {/* <h1>{t("greeting")}</h1> */}
      <HeroSection lang={resolvedParams.locale} />
      <FeaturedSection lang={resolvedParams.locale} />
      <PopularSection lang={resolvedParams.locale} />
      <LatestNews lang={resolvedParams.locale} />
      <ReviewsSection lang={resolvedParams.locale} />
    </div>
  );
};

export default Page;
