import Image from "next/image";
import Link from "next/link";

const popularArticlesCore = {
  en: [
    {
      id: 8,
      title: "Why Everyone Is Talking About the RTX 4080 Super",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Gaming",
      date: "June 8, 2023",
      readTime: "4 min read",
    },
    {
      id: 9,
      title: "The Privacy Paradox: How Tech Giants Are Using Your Data",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Privacy",
      date: "June 7, 2023",
      readTime: "6 min read",
    },
    {
      id: 10,
      title: "Best True Wireless Earbuds Under $100",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "Audio",
      date: "June 6, 2023",
      readTime: "5 min read",
    },
    {
      id: 11,
      title: "Can Quantum Computing Change Cybersecurity Forever?",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Security",
      date: "June 5, 2023",
      readTime: "7 min read",
    },
    {
      id: 12,
      title: "5G Technology: The Impact on Rural Communities",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "Connectivity",
      date: "June 4, 2023",
      readTime: "5 min read",
    },
    {
      id: 13,
      title: "Are Electric Vehicles Finally Ready for Mass Adoption?",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/02/online-shopper-credit-card.jpg",
      category: "Transportation",
      date: "June 3, 2023",
      readTime: "6 min read",
    },
  ],

  bn: [
    {
      id: 8,
      title: "সবার আলোচনার কেন্দ্রে কেন RTX 4080 সুপার?",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "গেমিং",
      date: "৮ জুন, ২০২৩",
      readTime: "৪ মিনিট পড়া",
    },
    {
      id: 9,
      title:
        "গোপনীয়তার দ্বন্দ্ব: টেক জায়ান্টরা কীভাবে আপনার ডেটা ব্যবহার করছে",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "গোপনীয়তা",
      date: "৭ জুন, ২০২৩",
      readTime: "৬ মিনিট পড়া",
    },
    {
      id: 10,
      title: "১০০ ডলারের নিচে সেরা ট্রু ওয়্যারলেস ইয়ারবাড",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "অডিও",
      date: "৬ জুন, ২০২৩",
      readTime: "৫ মিনিট পড়া",
    },
    {
      id: 11,
      title: "কোয়ান্টাম কম্পিউটিং কি সাইবার সিকিউরিটিকে চিরতরে বদলে দেবে?",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "নিরাপত্তা",
      date: "৫ জুন, ২০২৩",
      readTime: "৭ মিনিট পড়া",
    },
    {
      id: 12,
      title: "৫জি প্রযুক্তি: গ্রামীণ এলাকায় প্রভাব",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "সংযোগ",
      date: "৪ জুন, ২০২৩",
      readTime: "৫ মিনিট পড়া",
    },
    {
      id: 13,
      title: "ইলেকট্রিক গাড়ি কি এখন গণস্বীকৃতির জন্য প্রস্তুত?",
      image:
        "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/02/online-shopper-credit-card.jpg",
      category: "পরিবহন",
      date: "৩ জুন, ২০২৩",
      readTime: "৬ মিনিট পড়া",
    },
  ],
};

const PopularSection = ({ lang = "en" }: { lang?: "en" | "bn" }) => {
  const popularArticles = popularArticlesCore[lang];
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500">
          Popular This Week
        </h2>
        <Link href="/popular" className="text-sm text-red-500 hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {popularArticles.map((article) => (
          <div key={article.id} className="flex group">
            <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                fill
                alt={article.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="ml-3 flex-1">
              <span className="text-xs text-red-500 block mb-1">
                {article.category}
              </span>
              <h3 className="font-medium text-sm leading-tight mb-1 group-hover:text-red-500 transition-colors line-clamp-2">
                <Link href={`/article/${article.id}`}>{article.title}</Link>
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSection;
