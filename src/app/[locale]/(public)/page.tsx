import { IParamsProps } from "@/interface/common";
import HeroSection from "./_home/components/hero-section";
import FeaturedSection from "./_home/components/featured-section";
import PopularSection from "./_home/components/popular-section";
import LatestNews from "./_home/components/latest-news";
import ReviewsSection from "./_home/components/reviews-section";

const HomePage = async ({ params }: IParamsProps) => {
  // Language
  const resolvedParams = await params;
  const lang = resolvedParams.locale;

  return (
    <div className="min-h-screen">
      <HeroSection lang={lang} />
      <FeaturedSection lang={lang} />
      <PopularSection lang={lang} />
      <LatestNews lang={lang} />
      <ReviewsSection lang={lang} />
    </div>
  );
};

export default HomePage;
