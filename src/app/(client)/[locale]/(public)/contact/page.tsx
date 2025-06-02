import type { Metadata } from "next";
import ContactPage from "./_components/contact-page";

// Static metadata for the contact page
export const metadata: Metadata = {
  title: "Contact Us | LensLogy",
  description:
    "Get in touch with the LensLogy team for inquiries, news tips, advertising opportunities, or technical support.",
  keywords: ["contact", "support", "lenslogy", "tech news", "inquiries"],
  openGraph: {
    title: "Contact Us | LensLogy",
    description:
      "Get in touch with the LensLogy team for inquiries, news tips, advertising opportunities, or technical support.",
    url: "https://lenslogy.com/contact",
    siteName: "LensLogy",
    images: [
      {
        url: "/images/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "LensLogy Contact Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | LensLogy",
    description:
      "Get in touch with the LensLogy team for inquiries, news tips, advertising opportunities, or technical support.",
    images: ["/images/contact-og.jpg"],
    creator: "@lenslogy",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lenslogy.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
