import { IParamsProps } from "@/interface/common";
import LatestNews from "./_home/components/latest-news/latest-news";
import PopularSection from "./_home/components/popular-section";
import ReviewsSection from "./_home/components/reviews-section";
import HeroSection from "./_home/components/hero-section";
import FeaturedSection from "./_home/components/featured-section/featured-section";

const HomePage = async ({ params }: IParamsProps) => {
  // Language
  const resolvedParams = await params;
  const lang = resolvedParams.locale;
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/articles/nav?lang=${lang}`,
  //   {
  //     next: { revalicreatedAt: 60 },
  //   }
  // );

  // const data = await res.json();
  // console.log("data from navbar", data);

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
