import Image from "next/image";
import type React from "react";
import { notFound } from "next/navigation";
import ArticleSideBar from "../_components/sidebar/sidebar";
import type { IPageProps } from "../_interface/interface";
import ArticleHeader from "./_components/article-header";
import { generateSeoMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getOneArticle } from "@/lib/api";

// Generate metadata for the article page
export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.locale;
  const baseId = resolvedParams!.baseId as string;

  try {
    const { locale, baseId } = await params;
    const lang = locale === "en" ? "en" : "bn";

    const article = await getOneArticle(baseId, lang);

    if (!article) {
      return generateSeoMetadata({
        title: "Article Not Found",
        description: "The article you're looking for doesn't exist.",
        noIndex: true,
      });
    }
    // Create a simple description without using DOMParser (server-safe)
    let description = "";
    if (article.description) {
      description = article.description;
    } else if (article.content) {
      // Simple HTML tag stripping for description (server-safe)
      const strippedContent = article.content
        .replace(/<[^>]*>/g, " ") // Replace HTML tags with spaces
        .replace(/\s{2,}/g, " ") // Replace multiple spaces with single space
        .trim();

      description =
        strippedContent.substring(0, 160) +
        (strippedContent.length > 160 ? "..." : "");
    }

 

    // Generate metadata with article-specific information
    return generateSeoMetadata({
      title: article.title,
      description: description,
      image: article.image,
      type: "article",
      pathname: `/article/${baseId}`,
      locale: lang,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authors: article.author ? [{ name: article.author }] : undefined,
      keywords: article.tags,
    });
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    // Fallback metadata for error case
    return generateSeoMetadata({
      title: "Article Not Found",
      description:
        "The article you're looking for doesn't exist or has been removed.",
      noIndex: true,
    });
  }
}

const ArticlePage: React.FC<IPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const lang = resolvedParams.locale;
  const language = lang === "en" ? "en" : "bn";
  const baseId = resolvedParams!.baseId as string;

  const article = await getOneArticle(baseId, lang);

  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <article className="container mx-auto px-4 py-8">
        {/* Article header */}
        <ArticleHeader article={article} lang={language} />

        {/* Featured image */}
        {article?.image && (
          <div className="relative w-full h-64 md:h-96 mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* article left side bar  */}
          <ArticleSideBar />

          {/* article main content  */}
          <div className="md:flex-1 order-1 md:order-2">
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-500 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: article?.content,
              }}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default ArticlePage;
