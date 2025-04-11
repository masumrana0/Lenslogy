import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    id: 19,
    title: "Sony WH-1000XM5 Review: Still the Noise-Cancelling King?",
    excerpt:
      "We put Sony's flagship headphones to the test against the latest competitors.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/microprocessor-international-trade.jpg",
    category: "Audio",
    rating: 9.3,
    date: "May 28, 2023",
  },
  {
    id: 20,
    title: "MacBook Pro M3 Max Review: Apple's Most Powerful Laptop Yet",
    excerpt:
      "A comprehensive review of Apple's latest pro-level laptop with benchmark tests.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
    category: "Laptops",
    rating: 9.5,
    date: "May 27, 2023",
  },
  {
    id: 21,
    title: "Samsung S24 Ultra Camera Review: A Photographer's Perspective",
    excerpt:
      "Does the S24 Ultra live up to the hype? A professional photographer weighs in.",
    image: "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/gripes-with-Apple.jpg",
    category: "Smartphones",
    rating: 9.0,
    date: "May 26, 2023",
  },
  {
    id: 22,
    title: "Asus ROG Ally X Review: The Steam Deck Killer?",
    excerpt: "Can Asus dethrone Valve in the handheld gaming PC market?",
    image: "https://www.ecommercetimes.com/wp-content/uploads/sites/5/2025/02/online-shopper-credit-card.jpg",
    category: "Gaming",
    rating: 8.7,
    date: "May 25, 2023",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500">
          Latest Reviews
        </h2>
        <Link href="/reviews" className="text-sm text-red-500 hover:underline">
          View All Reviews
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="group">
            <div className="relative h-48 mb-3 overflow-hidden">
              <Image
                src={review.image || "/placeholder.svg"}
                fill
                alt={review.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1">
                  {review.category}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="inline-block bg-gray-900 text-white text-sm font-bold px-2 py-1 rounded-full">
                  {review.rating}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
              <Link href={`/review/${review.id}`}>{review.title}</Link>
            </h3>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {review.excerpt}
            </p>

            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
