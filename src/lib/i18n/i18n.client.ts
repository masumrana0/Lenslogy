import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const initI18n = () => {
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
          useSuspense: false, // Set to false to prevent hydration issues
        },
        // Add these options to improve loading
        load: "languageOnly",
        preload: ["en", "bn"],
        keySeparator: ".",
        interpolation: {
          escapeValue: false,
        },
      });
  }
  return i18n;
};

export default initI18n();
