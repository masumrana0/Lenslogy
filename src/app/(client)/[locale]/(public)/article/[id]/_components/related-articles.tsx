import DefaultArticleCard from "../../_components/article-card/default-card";
import {
  IArticleForCard,
  RelatedArticlesProps,
} from "../../_interface/interface";

const relatedArticles: IArticleForCard[] = [
  {
    id: "1",
    title: "অ্যাপলের ভিশন প্রো: এটি কীভাবে মেটা কোয়েস্ট ৩ এর সাথে তুলনা করে",
    excerpt: "বাজারের দুটি শীর্ষস্থানীয় ভিআর হেডসেটের বিস্তারিত তুলনা।",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-brain.jpg",
    category: "ভিআর এবং এআর",
    date: "June 20, 2023",
  },
  {
    id: "2",
    title: "অ্যাপলের ভিশন প্রো: এটি কীভাবে মেটা কোয়েস্ট ৩ এর সাথে তুলনা করে",
    excerpt: "বাজারের দুটি শীর্ষস্থানীয় ভিআর হেডসেটের বিস্তারিত তুলনা।",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-brain.jpg",
    category: "ভিআর এবং এআর",
    date: "June 20, 2023",
  },
  {
    id: "3",
    title: "অ্যাপলের ভিশন প্রো: এটি কীভাবে মেটা কোয়েস্ট ৩ এর সাথে তুলনা করে",
    excerpt: "বাজারের দুটি শীর্ষস্থানীয় ভিআর হেডসেটের বিস্তারিত তুলনা।",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/ai-brain.jpg",
    category: "ভিআর এবং এআর",
    date: "June 20, 2023",
  },
];

const RelatedArticles = ({
  lang = "en",
  title,
  category,
}: RelatedArticlesProps) => {
  const articles = relatedArticles;

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500 dark:text-white">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <DefaultArticleCard
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

export default RelatedArticles;
