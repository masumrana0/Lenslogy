import React from "react";
import ViewAll from "../vew-all";
import { IArticleForCard } from "../../../article/_interface/interface";
import DefaultArticleCard from "../../../article/_components/article-card/default-card";
 

const featuredArticleCore = {
  en: [
    {
      id: 4,
      title: "iPhone 15 Pro Max Review: Apple's Best Yet?",
      excerpt: "We take a deep dive into Apple's latest flagship smartphone.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Smartphones",
      createdAt: "June 12, 2023",
    },
    {
      id: 5,
      title: "Samsung's New Foldable Tech: Is This the Future?",
      excerpt:
        "Exploring the latest advancements in foldable display technology.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "Innovation",
      createdAt: "June 11, 2023",
    },
    {
      id: 6,
      title: "Best Budget Gaming Laptops of 2023",
      excerpt:
        "Gaming on a budget? These laptops deliver performance without breaking the bank.",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "Gaming",
      createdAt: "June 10, 2023",
    },
    {
      id: 7,
      title: "The Rise of AI in Everyday Tech Products",
      excerpt:
        "How artificial intelligence is silently revolutionizing the devices we use daily.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "AI",
      createdAt: "June 9, 2023",
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
      createdAt: "১২ জুন, ২০২৩",
    },
    {
      id: 5,
      title: "স্যামসাংয়ের নতুন ফোল্ডেবল প্রযুক্তি: এটাই কি ভবিষ্যত?",
      excerpt: "ফোল্ডেবল ডিসপ্লে প্রযুক্তির সর্বশেষ উন্নয়ন নিয়ে বিশ্লেষণ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "উদ্ভাবন",
      createdAt: "১১ জুন, ২০২৩",
    },
    {
      id: 6,
      title: "২০২৩ সালের সেরা বাজেট গেমিং ল্যাপটপসমূহ",
      excerpt:
        "বাজেটের মধ্যে গেমিং করতে চান? এই ল্যাপটপগুলো দিচ্ছে চমৎকার পারফরম্যান্স।",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "গেমিং",
      createdAt: "১০ জুন, ২০২৩",
    },
    {
      id: 7,
      title: "দৈনন্দিন প্রযুক্তিতে এআই এর উত্থান",
      excerpt:
        "কিভাবে কৃত্রিম বুদ্ধিমত্তা নীরবে আমাদের দৈনন্দিন ডিভাইসগুলো বদলে দিচ্ছে।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "এআই",
      createdAt: "৯ জুন, ২০২৩",
    },
  ],
};

const FeaturedSection = ({ lang = "en" }: { lang?: "en" | "bn" }) => {
  const featuredArticles = featuredArticleCore[lang];
  return (
    <section className="py-8 border-t border-b">
      <ViewAll title="Featured Blog" href="featured" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredArticles.map((article: IArticleForCard) => (
          <DefaultArticleCard
            article={article}
            key={article.id}
            showCategory
            showExcerpt
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
