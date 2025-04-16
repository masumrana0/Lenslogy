// "use client";
// import React from "react";
// import { getText } from "@/lib/utils";
// import ViewAllLayout from "@/components/shared/layout/view-all-layout";
// import { IParamsProps } from "@/interface/common";

// export const featuredArticlesData = {
//   en: [
//     {
//       id: 4,
//       title: "iPhone 15 Pro Max Review: Apple's Best Yet?",
//       excerpt: "We take a deep dive into Apple's latest flagship smartphone.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
//       category: "Smartphones",
//       date: "June 12, 2023",
//     },
//     {
//       id: 5,
//       title: "Samsung's New Foldable Tech: Is This the Future?",
//       excerpt:
//         "Exploring the latest advancements in foldable display technology.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
//       category: "Innovation",
//       date: "June 11, 2023",
//     },
//     {
//       id: 6,
//       title: "Best Budget Gaming Laptops of 2023",
//       excerpt:
//         "Gaming on a budget? These laptops deliver performance without breaking the bank.",
//       image:
//         "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
//       category: "Gaming",
//       date: "June 10, 2023",
//     },
//     {
//       id: 7,
//       title: "The Rise of AI in Everyday Tech Products",
//       excerpt:
//         "How artificial intelligence is silently revolutionizing the devices we use daily.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
//       category: "AI",
//       date: "June 9, 2023",
//     },
//     {
//       id: 8,
//       title: "The Future of Wearable Technology",
//       excerpt:
//         "From health monitoring to augmented reality, wearables are evolving rapidly.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-brain.jpg",
//       category: "Wearables",
//       date: "June 8, 2023",
//     },
//     {
//       id: 9,
//       title: "How 5G is Transforming Rural Connectivity",
//       excerpt:
//         "The latest generation of mobile networks is bringing high-speed internet to previously underserved areas.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-security.jpg",
//       category: "Connectivity",
//       date: "June 7, 2023",
//     },
//     {
//       id: 10,
//       title: "The Best Smart Home Devices of 2023",
//       excerpt:
//         "Our comprehensive guide to the most innovative and reliable smart home products.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-faces.jpg",
//       category: "Smart Home",
//       date: "June 6, 2023",
//     },
//     {
//       id: 11,
//       title: "Sustainable Tech: Eco-Friendly Gadgets Making a Difference",
//       excerpt:
//         "These innovative products are helping consumers reduce their environmental footprint.",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
//       category: "Sustainability",
//       date: "June 5, 2023",
//     },
//   ],
//   bn: [
//     {
//       id: 4,
//       title: "আইফোন ১৫ প্রো ম্যাক্স রিভিউ: অ্যাপলের সেরা এখনো?",
//       excerpt: "অ্যাপলের সর্বশেষ ফ্ল্যাগশিপ স্মার্টফোন নিয়ে গভীর বিশ্লেষণ।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
//       category: "স্মার্টফোন",
//       date: "১২ জুন, ২০২৩",
//     },
//     {
//       id: 5,
//       title: "স্যামসাংয়ের নতুন ফোল্ডেবল প্রযুক্তি: এটাই কি ভবিষ্যত?",
//       excerpt: "ফোল্ডেবল ডিসপ্লে প্রযুক্তির সর্বশেষ উন্নয়ন নিয়ে বিশ্লেষণ।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
//       category: "উদ্ভাবন",
//       date: "১১ জুন, ২০২৩",
//     },
//     {
//       id: 6,
//       title: "২০২৩ সালের সেরা বাজেট গেমিং ল্যাপটপসমূহ",
//       excerpt:
//         "বাজেটের মধ্যে গেমিং করতে চান? এই ল্যাপটপগুলো দিচ্ছে চমৎকার পারফরম্যান্স।",
//       image:
//         "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
//       category: "গেমিং",
//       date: "১০ জুন, ২০২৩",
//     },
//     {
//       id: 7,
//       title: "দৈনন্দিন প্রযুক্তিতে এআই এর উত্থান",
//       excerpt:
//         "কিভাবে কৃত্রিম বুদ্ধিমত্তা নীরবে আমাদের দৈনন্দিন ডিভাইসগুলো বদলে দিচ্ছে।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
//       category: "এআই",
//       date: "৯ জুন, ২০২৩",
//     },
//     {
//       id: 8,
//       title: "পরিধানযোগ্য প্রযুক্তির ভবিষ্যৎ",
//       excerpt:
//         "স্বাস্থ্য পর্যবেক্ষণ থেকে অগমেন্টেড রিয়েলিটি, ওয়্যারেবলস দ্রুত বিকশিত হচ্ছে।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-brain.jpg",
//       category: "ওয়্যারেবলস",
//       date: "৮ জুন, ২০২৩",
//     },
//     {
//       id: 9,
//       title: "কিভাবে ৫জি গ্রামীণ সংযোগ পরিবর্তন করছে",
//       excerpt:
//         "মোবাইল নেটওয়ার্কের সর্বশেষ প্রজন্ম পূর্বে অবহেলিত এলাকায় উচ্চ-গতির ইন্টারনেট নিয়ে আসছে।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-security.jpg",
//       category: "সংযোগ",
//       date: "৭ জুন, ২০২৩",
//     },
//     {
//       id: 10,
//       title: "২০২৩ সালের সেরা স্মার্ট হোম ডিভাইস",
//       excerpt:
//         "সবচেয়ে উদ্ভাবনী এবং নির্ভরযোগ্য স্মার্ট হোম পণ্যগুলির আমাদের বিস্তৃত গাইড।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-faces.jpg",
//       category: "স্মার্ট হোম",
//       date: "৬ জুন, ২০২৩",
//     },
//     {
//       id: 11,
//       title: "টেকসই প্রযুক্তি: পার্থক্য তৈরি করছে পরিবেশ-বান্ধব গ্যাজেট",
//       excerpt:
//         "এই উদ্ভাবনী পণ্যগুলি ভোক্তাদের পরিবেশগত পদচিহ্ন কমাতে সাহায্য করছে।",
//       image:
//         "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
//       category: "টেকসই",
//       date: "৫ জুন, ২০২৩",
//     },
//   ],
// };

// // eslint-disable-next-line @next/next/no-async-client-component
// const FeaturedPage: React.FC<IParamsProps> = async ({ params }) => {
//   const resolvedParams = await params;
//   const language = resolvedParams.locale;
//   const articles = featuredArticlesData[language] || [];

//   // Handle category filter
//   // const handleCategoryChange = (category: string) => {
//   //   if (category === "all") {
//   //   } else {
//   //     const filtered = articles.filter(
//   //       (article) =>
//   //         article.category &&
//   //         (article.category.en === category || article.category.bn === category)
//   //     );
//   //   }
//   // };

//   // Handle sort
//   // const handleSortChange = (sort: string) => {
//   //   const sorted = [...filteredArticles];

//   //   switch (sort) {
//   //     case "newest":
//   //       sorted.sort(
//   //         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   //       );
//   //       break;
//   //     case "oldest":
//   //       sorted.sort(
//   //         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   //       );
//   //       break;
//   //     // Add more sorting options as needed
//   //   }

//   //   setFilteredArticles(sorted);
//   // };

//   return (
//     <ViewAllLayout
//       title={getText("featuredStories", language)}
//       articles={articles}
//       onSortChange={handleSortChange}
//       columns={3}
//       variant="default"
//       showCategory={true}
//       showExcerpt={true}
//     />
//   );
// };

// export default FeaturedPage;

import React from "react";

const FeaturedPage = () => {
  return (
    <div>
      <h3>Featured Page</h3>
    </div>
  );
};

export default FeaturedPage;
