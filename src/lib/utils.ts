import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { translations } from "@/lib/data";
import { LocalizedContent } from "@/components/shared/layout/type";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalizedContent = (
  content: LocalizedContent,
  language: string
) => {
  return content[language === "bn" ? "bn" : "en"];
};

export const getText = (
  key: keyof (typeof translations)["en" | "bn"],
  language: keyof typeof translations
) => {
  return translations[language][key];
};

export const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);

  if (language === "bn") {
    // Bengali date formatting logic could be added here
    return dateString;
  }

  // Default English formatting
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
