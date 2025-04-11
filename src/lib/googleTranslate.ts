// // lib/googleTranslate.ts
// import { Translate } from "@google-cloud/translate/build/src/v2";

// console.log(process.env.GOOGLE_API_KEY);
// const translate = new Translate({
//   key: process.env.GOOGLE_API_KEY, // or use a service account
// });

// export async function translateText(
//   text: string,
//   targetLang: string
// ): Promise<string> {
//   const [translation] = await translate.translate(text, targetLang);
//   return translation;
// }
