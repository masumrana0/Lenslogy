import Image from "next/image";
import Link from "next/link";
import React from "react";

const featuredArticleCore = {
  en: [
    {
      id: 4,
      title: "iPhone 15 Pro Max Review: Apple's Best Yet?",
      excerpt: "We take a deep dive into Apple's latest flagship smartphone.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Smartphones",
      date: "June 12, 2023",
    },
    {
      id: 5,
      title: "Samsung's New Foldable Tech: Is This the Future?",
      excerpt:
        "Exploring the latest advancements in foldable display technology.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "Innovation",
      date: "June 11, 2023",
    },
    {
      id: 6,
      title: "Best Budget Gaming Laptops of 2023",
      excerpt:
        "Gaming on a budget? These laptops deliver performance without breaking the bank.",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "Gaming",
      date: "June 10, 2023",
    },
    {
      id: 7,
      title: "The Rise of AI in Everyday Tech Products",
      excerpt:
        "How artificial intelligence is silently revolutionizing the devices we use daily.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "AI",
      date: "June 9, 2023",
    },
  ],

  bn: [
    {
      id: 4,
      title: "আইফোন ১৫ প্রো ম্যাক্স রিভিউ: অ্যাপলের সেরা এখনো?",
      excerpt: "অ্যাপলের সর্বশেষ ফ্ল্যাগশিপ স্মার্টফোন নিয়ে গভীর বিশ্লেষণ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "স্মার্টফোন",
      date: "১২ জুন, ২০২৩",
    },
    {
      id: 5,
      title: "স্যামসাংয়ের নতুন ফোল্ডেবল প্রযুক্তি: এটাই কি ভবিষ্যত?",
      excerpt: "ফোল্ডেবল ডিসপ্লে প্রযুক্তির সর্বশেষ উন্নয়ন নিয়ে বিশ্লেষণ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "উদ্ভাবন",
      date: "১১ জুন, ২০২৩",
    },
    {
      id: 6,
      title: "২০২৩ সালের সেরা বাজেট গেমিং ল্যাপটপসমূহ",
      excerpt:
        "বাজেটের মধ্যে গেমিং করতে চান? এই ল্যাপটপগুলো দিচ্ছে চমৎকার পারফরম্যান্স।",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "গেমিং",
      date: "১০ জুন, ২০২৩",
    },
    {
      id: 7,
      title: "দৈনন্দিন প্রযুক্তিতে এআই এর উত্থান",
      excerpt:
        "কিভাবে কৃত্রিম বুদ্ধিমত্তা নীরবে আমাদের দৈনন্দিন ডিভাইসগুলো বদলে দিচ্ছে।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "এআই",
      date: "৯ জুন, ২০২৩",
    },
  ],
};

const FeaturedSection = ({ lang = "en" }: { lang?: "en" | "bn" }) => {
  const featuredArticles = featuredArticleCore[lang];
  return (
    <section className="py-8 border-t border-b">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500">
          Featured Stories
        </h2>
        <Link
          href="/article/featured"
          className="text-sm text-red-500 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredArticles.map((article) => (
          <div key={article.id} className="group">
            <div className="relative h-48 mb-3 overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                fill
                alt={article.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
                  {article.category}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </h3>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {article.excerpt}
            </p>

            <span className="text-xs text-gray-500">{article.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
