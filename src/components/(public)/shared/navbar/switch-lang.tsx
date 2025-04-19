"use client";
import "@/lib/i18n/i18n.client";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LOCALES = ["en", "bn"];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1];
  const [isPending, startTransition] = useTransition();
  const { i18n } = useTranslation();

  const switchLanguage = () => {
    // const segments = pathname.split("/");

    // Detect current language from the first segment
    const currentLocale = SUPPORTED_LOCALES.includes(segments[1])
      ? segments[1]
      : "bn";

    const newLocale = currentLocale === "en" ? "bn" : "en";

    // Replace the locale segment
    if (SUPPORTED_LOCALES.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join("/") || "/";
    document.cookie = `i18next=${newLocale}; path=/`;

    // Trigger i18next language change manually
    i18n.changeLanguage(newLocale).then(() => {
      startTransition(() => {
        router.replace(newPath); // use replace to avoid stacking history
      });
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={() => switchLanguage()}
      className="text-sm font-medium hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 hover"
    >
      {currentLocale === "en" ? (
        <span> English ⇄ বাংলা</span>
      ) : (
        <span>বাংলা ⇄ English</span>
      )}
    </button>
  );
};

export default LanguageSwitcher;
