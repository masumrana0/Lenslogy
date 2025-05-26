import { IParamsProps } from "@/interface/common";
import LatestNews from "./_home/components/latest-news/latest-news";
import PopularSection from "./_home/components/popular-section";
import ReviewsSection from "./_home/components/reviews-section";
import HeroSection from "./_home/components/hero-section";
import FeaturedSection from "./_home/components/featured-section/featured-section";
import { getHomeAllArticles } from "@/lib/api";
import { notFound } from "next/navigation";

const HomePage = async ({ params }: IParamsProps) => {
  // Language
  const resolvedParams = await params;
  const lang = resolvedParams.locale;
  const data = await getHomeAllArticles(lang);

  return (
    <div className="min-h-screen">
      <HeroSection articles={data?.isPinHero} lang={lang} />
      <FeaturedSection articles={data?.isPinFeatured} lang={lang} />
      {/* <PopularSection articles={data?.isPupular} lang={lang} /> */}
      <LatestNews articles={data?.isPinLatest} lang={lang} />
      {/* <ReviewsSection lang={lang} /> */}
    </div>
  );
};

export default HomePage;
