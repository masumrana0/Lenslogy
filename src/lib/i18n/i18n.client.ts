// src/lib/i18n/i18n.client.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "bn"],
      defaultNS: "translation",
      ns: ["translation"],
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["cookie", "htmlTag", "localStorage", "navigator"],
        caches: ["cookie"],
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
