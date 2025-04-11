import i18next, { InitOptions } from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

const initOptions: InitOptions = {
  fallbackLng: "en",
  supportedLngs: ["en", "bn"],
  defaultNS: "translation",
  ns: ["translation"],
  backend: {
    loadPath: path.resolve("./public/locales/{{lng}}/{{ns}}.json"),
  },
  initImmediate: false,
};

let i18nInstance: typeof i18next | null = null;

export async function getServerTranslation(lng: string) {
  if (!i18nInstance) {
    i18nInstance = i18next.createInstance();
    await i18nInstance.use(Backend).init(initOptions);
  }

  await i18nInstance.changeLanguage(lng);
  return {
    t: i18nInstance.t.bind(i18nInstance),
  };
}
