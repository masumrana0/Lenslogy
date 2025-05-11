import type { Metadata } from "next";
import { IArticleForCard } from "../_interface/interface";
import ArticlesPageLayout from "../_components/page-layout/page-layout";

export const metadata: Metadata = {
  title: "Latest This Week | WiRE Technology Blog",
  description:
    "The most read and shared articles from our tech community this week.",
  openGraph: {
    title: "Popular This Week | WiRE Technology Blog",
    description:
      "The most read and shared articles from our tech community this week.",
    type: "website",
    url: "https://wire-tech.com/popular",
    images: [
      {
        url: "https://wire-tech.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WiRE Technology Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Popular This Week | WiRE Technology Blog",
    description:
      "The most read and shared articles from our tech community this week.",
    images: ["https://wire-tech.com/og-image.jpg"],
  },
};

export const articles: IArticleForCard[] = [
  {
    id: "1",
    title: "The Rise of Artificial Intelligence",
    excerpt:
      "Explore how AI is transforming industries and shaping our future.",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Technology",
    createdAt: "2025-04-15",
  },
  {
    id: "2",
    title: "Mastering Remote Work in 2025",
    excerpt: "Tips and tools to stay productive while working from anywhere.",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Productivity",
    createdAt: "2025-04-10",
  },
  {
    id: "3",
    title: "Top 10 Travel Destinations This Year",
    excerpt: "Discover breathtaking places to visit around the world in 2025.",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Travel",
    createdAt: "2025-03-28",
  },
  {
    id: "4",
    title: "The Future of Green Energy",
    excerpt: "How renewable energy is shaping a sustainable tomorrow.",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Environment",
    createdAt: "2025-03-20",
  },
  {
    id: "5",
    title: "Investing in the Stock Market for Beginners",
    excerpt:
      "A beginner’s guide to understanding and entering the stock market.",
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Finance",
    createdAt: "2025-02-25",
  },
];

const LatestPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Default to English, but in a real app this would come from cookies or user preferences
  const lang = "bn";

  // Get the category and sort parameters from the URL
  const categoryParam = searchParams.category as string | undefined;
  const sortParam = searchParams.sort as string | undefined;
  const categories: string[] = [
    "Technology",
    "Artificial Intelligence",
    "Software Development",
    "Design",
    "Business",
    "Health",
    "Science",
    "Education",
    "Travel",
    "Lifestyle",
    "Finance",
    "Marketing",
    "Productivity",
    "Startups",
    "Gaming",
    "Culture",
    "Photography",
    "Food",
    "Environment",
    "Politics",
  ];

  // Handle category filter

  // Fetch data
  // const articlesData = await getPopularArticles(language);
  // const categories = await getCategories("popular", language);

  return (
    <ArticlesPageLayout
      title={"latestPage"}
      lang={lang}
      articles={articles}
      categories={categories}
      columns={2}
      variant="horizontal"
      showCategory={true}
      showExcerpt={true}
    />
  );
};

export default LatestPage;
