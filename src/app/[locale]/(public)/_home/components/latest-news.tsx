import Image from "next/image";
import Link from "next/link";

const latestArticles = [
  {
    id: 14,
    title: "NVIDIA Announces New AI Supercomputer: 4x Faster Than Previous Gen",
    excerpt:
      "The latest AI hardware breakthrough promises to revolutionize deep learning research.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
    category: "Hardware",
    date: "June 2, 2023",
  },
  {
    id: 15,
    title: "EU's New Tech Regulations Could Reshape How Big Tech Operates",
    excerpt:
      "Major regulatory changes that will impact how tech companies handle user data and competition.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
    category: "Policy",
    date: "June 1, 2023",
  },
  {
    id: 16,
    title: "The Future of Displays: MicroLED vs OLED vs Mini-LED",
    excerpt:
      "Exploring the pros and cons of next-generation display technologies coming to your devices.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
    category: "Displays",
    date: "May 31, 2023",
  },
  {
    id: 17,
    title: "Windows 12: Everything We Know About Microsoft's Next Big Update",
    excerpt:
      "Rumored features, release date, and compatibility requirements for the next Windows version.",
    image: "https://www.linuxinsider.com/wp-content/uploads/sites/2/2022/03/server-admins.jpg",
    category: "Software",
    date: "May 30, 2023",
  },
  {
    id: 18,
    title: "NASA's New Mars Rover Will Include Advanced AI Systems",
    excerpt:
      "How artificial intelligence is helping explore the red planet with unprecedented autonomy.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/hp-sign.jpg",
    category: "Space Tech",
    date: "May 29, 2023",
  },
];

const LatestNews = () => {
  const mainArticle = latestArticles[0];
  const otherArticles = latestArticles.slice(1);

  return (
    <section className="py-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500">
          Latest News
        </h2>
        <Link href="/latest" className="text-sm text-red-500 hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured latest article */}
        <div className="group">
          <div className="relative h-64 mb-4 overflow-hidden">
            <Image
              src={mainArticle.image || "/placeholder.svg"}
              fill
              alt={mainArticle.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
                {mainArticle.category}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">
            <Link href={`/article/${mainArticle.id}`}>{mainArticle.title}</Link>
          </h3>

          <p className="text-gray-600 mb-3">{mainArticle.excerpt}</p>

          <span className="text-sm text-gray-500">{mainArticle.date}</span>
        </div>

        {/* Other latest articles */}
        <div className="space-y-6">
          {otherArticles.map((article) => (
            <div key={article.id} className="flex group">
              <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  fill
                  alt={article.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="ml-4 flex-1">
                <span className="text-xs text-red-500 block mb-1">
                  {article.category}
                </span>
                <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                  <Link href={`/article/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
