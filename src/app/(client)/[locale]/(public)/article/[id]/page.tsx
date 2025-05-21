import Image from "next/image";
import React from "react";
import ArticleSideBar from "../_components/sidebar/sidebar";
import { IArticle, IPageProps } from "../_interface/interface";
import ArticleHeader from "./_components/article-header";
import ArticleCommentSection from "./_components/comment-section";
import RelatedArticles from "./_components/related-articles";

const ArticlePage: React.FC<IPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const language = resolvedParams.locale;

  // Find the article based on the ID from the URL
  const article: IArticle = {
    id: "1",
    title: "Understanding the Future of AI",
    excerpt:
      "An overview of the evolving landscape of artificial intelligence and its future implications.",
    content: `
    An overview of the evolving landscape of artificial intelligence and its future implications.",
    content:(" <p>Meta's Quest 3 represents a significant leap forward in consumer virtual reality technology. As the successor to the popular Quest 2, this new headset brings several important improvements while maintaining a relatively affordable price point compared to competitors like Apple's Vision Pro.</p>

        <h2>Design and Comfort</h2>
        <p>The Quest 3 features a redesigned form factor that's approximately 40% thinner than its predecessor. At 515 grams, it's slightly lighter than the Quest 2, and the improved weight distribution makes it more comfortable for extended sessions. The head strap has been redesigned with better padding and adjustment mechanisms, though many users may still want to invest in the Elite Strap accessory for the most comfortable experience.</p>

        <p>Meta has also improved the facial interface with better padding and a more effective light-blocking design. The headset includes a physical IPD (interpupillary distance) adjustment mechanism that can be adjusted between 53mm and 75mm, accommodating a wide range of users.</p>

        <h2>Display and Optics</h2>
        <p>One of the most significant upgrades in the Quest 3 is its display system. The headset features new pancake lenses that offer better clarity and a wider sweet spot than the fresnel lenses used in previous models. The LCD panels provide a resolution of 2064 × 2208 per eye, resulting in approximately 25 pixels per degree. This represents a 30% increase in resolution compared to the Quest 2.</p>

        <p>The improved resolution is immediately noticeable, with sharper text and more detailed environments. The Quest 3 also offers a slightly wider field of view at approximately 110 degrees horizontal, reducing the "binocular" effect that has been a limitation of consumer VR headsets.</p>

        <h2>Performance</h2>
        <p>Powered by the Qualcomm Snapdragon XR2 Gen 2 processor, the Quest 3 delivers significantly improved performance over its predecessor. Meta claims it offers twice the GPU performance of the Quest 2, and our testing confirms substantial improvements in both graphical fidelity and overall responsiveness.</p>

        <p>Games and applications load faster, maintain higher frame rates, and can display more complex environments with better lighting and effects. The headset comes with either 128GB or 512GB of storage, with no option for expansion via microSD.</p>

        <h2>Mixed Reality Capabilities</h2>
        <p>Perhaps the most exciting new feature of the Quest 3 is its enhanced mixed reality capability. The headset includes color passthrough cameras that provide a much clearer view of your surroundings than the grayscale cameras on the Quest 2. This enables more compelling mixed reality experiences where virtual objects can be placed convincingly in your physical space.</p>

        <p>The system also includes improved room mapping technology that can quickly create a detailed model of your environment, allowing virtual objects to interact more naturally with your physical space. For example, virtual balls can bounce off your real furniture, or virtual characters can navigate around obstacles in your room.</p>

        <h2>Controllers and Hand Tracking</h2>
        <p>The Quest 3 ships with redesigned Touch Plus controllers that eliminate the tracking rings found on previous models. Instead, they use built-in cameras for self-tracking, resulting in a more compact and comfortable design. The haptic feedback has been improved, providing more nuanced vibration effects that enhance immersion.</p>

        <p>Hand tracking has also seen significant improvements, with faster response times and better accuracy. Many applications now support hand tracking as a primary input method, though the controllers still provide better precision for most gaming applications.</p>

        <h2>Battery Life</h2>
        <p>Battery life remains a limitation for the Quest 3, with approximately 2-3 hours of use on a single charge depending on the applications being used. This is comparable to the Quest 2 but still falls short of what many users would consider ideal for longer VR sessions. The headset charges via USB-C, and Meta sells an optional battery pack that can extend usage time.</p>

        <h2>Software Ecosystem</h2>
        <p>The Quest 3 runs on the same Meta Horizon OS as the Quest 2, providing access to the extensive library of VR applications available on the Meta Quest Store. All Quest 2 applications are compatible with the Quest 3, and many developers are releasing upcreatedAts that take advantage of the new hardware's capabilities.</p>

        <p>Meta continues to invest heavily in exclusive content, with titles like Asgard's Wrath 2 showcasing what's possible on the new hardware. The company has also improved the social features of the platform, making it easier to connect with friends in virtual spaces.</p>

        <h2>Conclusion</h2>
        <p>The Meta Quest 3 represents a significant evolution of consumer VR technology. While it doesn't revolutionize the space, it offers meaningful improvements across the board that make VR more accessible, comfortable, and compelling. The enhanced mixed reality capabilities, in particular, point toward a future where VR headsets become more versatile tools for both work and entertainment.</p>

        <p>At $499 for the 128GB model and $649 for the 512GB version, the Quest 3 is more expensive than its predecessor but still offers excellent value compared to other headsets on the market. For newcomers to VR, it's an easy recommendation. For Quest 2 owners, the upgrade is more compelling than typical generational improvements, especially for those interested in mixed reality applications.</p>

        <p>The Quest 3 isn't perfect—battery life remains limited, and some users may still find it uncomfortable for extended sessions without additional accessories. However, it represents the most refined standalone VR experience currently available to consumers and sets a new standard for what we should expect from accessible virtual reality technology.</p>

    `,
    image:
      "https://www.technewsworld.com/wp-content/uploads/sites/3/2025/03/virtual-reality-metaverse.jpg",
    category: "Technology",
    author: {
      name: "Jane Doe",
      designation: "Software Engineer",
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQH5knHodXbHIA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710602305413?e=1750291200&v=beta&t=CE0p0_psVHuk0MDSpo4w38OIlYKWmDsWsRTnNTR_dL4 ",
      role: "Tech Journalist",
    },
    createdAt: "2025-04-15",
    tags: ["AI", "Future", "Technology"],
    articleAttachment: {
      articleId: "1",
      views: "1350",
      likes: "220",
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <article className="container mx-auto px-4 py-8">
        {/* Article header */}
        <ArticleHeader article={article} lang={language} />

        {/* Featured image */}
        <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* article left side bar  */}
          <ArticleSideBar />

          {/* article main content  */}
          <div className="md:flex-1 order-1 md:order-2">
            <div
              contentEditable
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-500 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
            />

            {/* Tags */}
            {/* <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div> */}

            {/* Comments section */}
            <ArticleCommentSection articleId={resolvedParams.id} />
          </div>
        </div>
      </article>

      {/* Related articles */}
      <RelatedArticles
        lang={language}
        title={"relatedArticles"}
        category={article.category}
      />
    </main>
  );
};

export default ArticlePage;
