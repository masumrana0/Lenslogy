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
