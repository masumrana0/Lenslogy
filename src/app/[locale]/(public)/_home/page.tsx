import FeaturedSection from "./components/featured-section";
import HeroSection from "./components/hero-section";
import LatestNews from "./components/latest-news";
import PopularSection from "./components/popular-section";
import ReviewsSection from "./components/reviews-section";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <PopularSection />
      <LatestNews />
      <ReviewsSection />
    </div>
  );
};

export default HomePage;
