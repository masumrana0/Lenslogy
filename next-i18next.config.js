// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "bn",
    locales: ["en", "bn"],
    localeDetection: false,
  },
  localePath: "./public/locales",
  // reloadOnPrerender: process.env.NODE_ENV === "development",
};
// This configuration file is used for the next-i18next library, which is a localization library for Next.js applications. It specifies the default locale, available locales, and whether to reload translations on prerendering in development mode.
// The `i18n` object contains the following properties:
