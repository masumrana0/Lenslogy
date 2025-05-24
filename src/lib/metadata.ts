import type { Metadata, ResolvingMetadata } from "next/types";

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "profile";
  pathname?: string;
  locale?: string;
  publishedAt?: string;
  updatedAt?: string;
  authors?: Array<{ name: string; url?: string }>;
  noIndex?: boolean;
};

const siteConfig = {
  name: "Lenslogy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lenslogy.com",
  description:
    "Lenslogy delivers in-depth technology insights, expert analysis, and engaging articles on the latest in software, AI, gadgets, and digital innovation.",
  defaultImage: "/images/og-image.jpg", // High-resolution OG image for social sharing
  defaultLocale: "en",
  twitterHandle: "@lenslogy", // Update if you have a real handle
};

/**
 * Generate metadata for any page with consistent SEO structure
 * @param pageMetadata Page-specific metadata
 * @param parent Parent metadata from parent layout (if available)
 * @returns Next.js Metadata object
 */
export async function generateSeoMetadata(
  pageMetadata: SeoProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // Merge with parent metadata if available
  const previousImages = (await parent)?.openGraph?.images || [];
  const previousKeywords = (await parent)?.keywords || [];

  // Prepare title with site name
  const title = pageMetadata.title
    ? `${pageMetadata.title} | ${siteConfig.name}`
    : siteConfig.name;

  // Use provided values or defaults
  const description = pageMetadata.description || siteConfig.description;
  const locale = pageMetadata.locale || siteConfig.defaultLocale;
  const url = pageMetadata.pathname
    ? `${siteConfig.url}${pageMetadata.pathname}`
    : siteConfig.url;
  const ogImage = pageMetadata.image || siteConfig.defaultImage;
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  // Combine keywords
  const keywords = [
    ...(pageMetadata.keywords || []),
    ...previousKeywords,
  ].filter(Boolean);

  return {
    // Basic metadata
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,

    // Robots
    robots: {
      index: !pageMetadata.noIndex,
      follow: !pageMetadata.noIndex,
      googleBot: {
        index: !pageMetadata.noIndex,
        follow: !pageMetadata.noIndex,
      },
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      type: pageMetadata.type || "website",
      locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
        ...previousImages,
      ],
      ...(pageMetadata.type === "article" && {
        publishedTime: pageMetadata.publishedAt,
        modifiedTime: pageMetadata.updatedAt,
        authors: pageMetadata.authors?.map(
          (author) => author.url || author.name
        ),
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },

    // Verification for search consoles (add your verification IDs if needed)
    verification: {
      // google: "your-google-verification-id",
      // yandex: "your-yandex-verification-id",
    },
  };
}
