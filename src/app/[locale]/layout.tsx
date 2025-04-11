import Provider from "@/lib/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { notFound } from "next/navigation";
import { dir } from "i18next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WiRE - Technology Blog",
  description: "Your source for the latest tech news, reviews, and insights",
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params = { locale: "en" },
}: RootLayoutProps) {
  const locale = params?.locale;

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
