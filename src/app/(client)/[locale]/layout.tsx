import Provider from "@/lib/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { notFound } from "next/navigation";
import { dir } from "i18next";
import { Language } from "@prisma/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lenslogy - Technology Blog",
  description: "Your source for the latest tech news, reviews, and insights",
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Language }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = (await params)?.locale;

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Provider>
      </body>
    </html>
  );
}
