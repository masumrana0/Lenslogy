import CompactArticleCard from "../../../article/_components/article-card/compact-card";
import ViewAll from "../vew-all";
import DefaultArticleCard from "../../../article/_components/article-card/default-card";

const latestArticles = {
  en: [
    {
      id: 14,
      title:
        "NVIDIA Announces New AI Supercomputer: 4x Faster Than Previous Gen",
      excerpt:
        "The latest AI hardware breakthrough promises to revolutionize deep learning research.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "Hardware",
      date: "June 2, 2023",
    },
    {
      id: 15,
      title: "EU's New Tech Regulations Could Reshape How Big Tech Operates",
      excerpt:
        "Major regulatory changes that will impact how tech companies handle user data and competition.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Policy",
      date: "June 1, 2023",
    },
    {
      id: 16,
      title: "The Future of Displays: MicroLED vs OLED vs Mini-LED",
      excerpt:
        "Exploring the pros and cons of next-generation display technologies coming to your devices.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "Displays",
      date: "May 31, 2023",
    },
    {
      id: 17,
      title: "Windows 12: Everything We Know About Microsoft's Next Big Update",
      excerpt:
        "Rumored features, release date, and compatibility requirements for the next Windows version.",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "Software",
      date: "May 30, 2023",
    },
    {
      id: 18,
      title: "NASA's New Mars Rover Will Include Advanced AI Systems",
      excerpt:
        "How artificial intelligence is helping explore the red planet with unprecedented autonomy.",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "Space Tech",
      date: "May 29, 2023",
    },
  ],

  bn: [
    {
      id: 14,
      title:
        "NVIDIA ঘোষণা দিল নতুন এআই সুপারকম্পিউটারের: আগের থেকে ৪ গুণ দ্রুত",
      excerpt:
        "সাম্প্রতিক এআই হার্ডওয়্যার উদ্ভাবন ডিপ লার্নিং গবেষণায় বিপ্লব আনবে বলে আশা করা হচ্ছে।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
      category: "হার্ডওয়্যার",
      date: "২ জুন, ২০২৩",
    },
    {
      id: 15,
      title:
        "ইইউর নতুন প্রযুক্তি নীতিমালা বদলে দিতে পারে বড় টেক কোম্পানিগুলোর কাজের ধরন",
      excerpt:
        "ব্যবহারকারীর তথ্য ও প্রতিযোগিতা নিয়ে টেক কোম্পানিগুলোর আচরণে বড় পরিবর্তন আনতে যাচ্ছে এই নীতিমালা।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "নীতি",
      date: "১ জুন, ২০২৩",
    },
    {
      id: 16,
      title: "ডিসপ্লের ভবিষ্যৎ: MicroLED বনাম OLED বনাম Mini-LED",
      excerpt:
        "আপনার ডিভাইসে আসা পরবর্তী প্রজন্মের ডিসপ্লে প্রযুক্তির সুবিধা ও অসুবিধা নিয়ে বিশ্লেষণ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
      category: "ডিসপ্লে",
      date: "৩১ মে, ২০২৩",
    },
    {
      id: 17,
      title:
        "Windows 12: মাইক্রোসফটের পরবর্তী বড় আপডেট সম্পর্কে যা যা জানা গেছে",
      excerpt:
        "গুজবভিত্তিক ফিচার, রিলিজ তারিখ এবং কম্প্যাটিবিলিটির তথ্য এক নজরে।",
      image:
        "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
      category: "সফটওয়্যার",
      date: "৩০ মে, ২০২৩",
    },
    {
      id: 18,
      title: "নাসার নতুন মঙ্গল রোভার থাকবে উন্নত এআই প্রযুক্তিতে সজ্জিত",
      excerpt:
        "কীভাবে কৃত্রিম বুদ্ধিমত্তা মঙ্গলের অনুসন্ধানে অসাধারণ স্বয়ংক্রিয়তা আনছে তা নিয়ে বিশ্লেষণ।",
      image:
        "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
      category: "স্পেস টেক",
      date: "২৯ মে, ২০২৩",
    },
  ],
};

const LatestNews = ({ lang = "en" }: { lang?: "en" | "bn" }) => {
  const articles = latestArticles[lang];
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section className="py-8 border-t">
      <ViewAll href="latest" title="Latest News" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/*  latest article */}
        <DefaultArticleCard article={mainArticle} showCategory showExcerpt />

        {/* Other latest articles */}
        <div className="space-y-6">
          {otherArticles.map((article) => (
            <CompactArticleCard
              article={article}
              key={article.id}
              showCategory
              showExcerpt
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
