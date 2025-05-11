import Image from "next/image";
import Link from "next/link";

const heroArticles = {
  en: [
    {
      id: 1,
      title: "Meta's Quest 3 Headset: Review & Feature Breakdown",
      excerpt:
        "A deep dive into Meta's latest VR technology with our comprehensive hands-on review.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/04/Lip-Bu-Tan.jpg",
      category: "VR & AR",
      createdAt: "June 15, 2023",
    },
    {
      id: 2,
      title:
        "Google's AI-Powered Search Overhaul Aims to Enhance User Experience",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/03/smartphone-security.jpg",
      category: "AI",
      createdAt: "June 14, 2023",
    },
    {
      id: 3,
      title:
        "Apple's WWDC 2023: Everything Announced for Developers and Consumers",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/02/online-shopper-credit-card.jpg",
      category: "Apple",
      createdAt: "June 13, 2023",
    },
  ],
  bn: [
    {
      id: 1,
      title: "মেটার কোয়েস্ট ৩ হেডসেট: রিভিউ ও ফিচার বিশ্লেষণ",
      excerpt:
        "মেটার সর্বশেষ ভার্চুয়াল রিয়েলিটি প্রযুক্তি নিয়ে আমাদের বিস্তারিত হ্যান্ডস-অন রিভিউ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/04/Lip-Bu-Tan.jpg",
      category: "ভিআর ও এআর",
      createdAt: "১৫ জুন, ২০২৩",
    },
    {
      id: 2,
      title:
        "গুগলের এআই চালিত সার্চ সংস্কার ব্যবহারকারীদের অভিজ্ঞতা উন্নত করবে",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/03/smartphone-security.jpg",
      category: "এআই",
      createdAt: "১৪ জুন, ২০২৩",
    },
    {
      id: 3,
      title: "অ্যাপলের WWDC ২০২৩: ডেভেলপার ও ব্যবহারকারীদের জন্য ঘোষিত সবকিছু",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/02/online-shopper-credit-card.jpg",
      category: "অ্যাপল",
      createdAt: "১৩ জুন, ২০২৩",
    },
  ],
};

const HeroSection = ({ lang = "en" }: { lang?: "en" | "bn" }) => {
  const articles = heroArticles[lang];
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <section className="grid items-center grid-cols-1 md:grid-cols-3 gap-4 pt-6 pb-10">
      {/* Main featured article */}
      <div className="md:col-span-2 relative group">
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src={mainArticle.image || "/placeholder.svg"}
            fill
            alt={mainArticle.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 mb-2">
            {mainArticle.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-red-400 transition-colors">
            <Link href={`/article/${mainArticle.id}`}>{mainArticle.title}</Link>
          </h2>
          {mainArticle.excerpt && (
            <p className="text-gray-200 mb-2 line-clamp-2">
              {mainArticle.excerpt}
            </p>
          )}
          <span className="text-sm text-gray-300">{mainArticle.createdAt}</span>
        </div>
      </div>

      {/* Side articles */}
      <div className="space-y-4">
        {sideArticles.map((article) => (
          <div key={article.id} className="relative h-[193px] group">
            <div className="relative h-full overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                fill
                alt={article.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 mb-2">
                {article.category}
              </span>
              <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">
                <Link href={`/article/${article.id}`}>{article.title}</Link>
              </h3>
              <span className="text-sm text-gray-300">{article.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
