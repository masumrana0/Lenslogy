// import {
//   featuredArticlesData,
//   popularArticlesData,
//   latestNewsData,
//   reviewsData,
// } from "@/lib/data";
// import { getServerTranslation } from "@/lib/i18n/i18n.server";

// // In a real application, these would be actual database queries
// // that filter data based on the provided parameters

// export async function getFeaturedArticles(
//   language = "en",
//   category?: string,
//   sort?: string
// ) {
//   // This would be a real API call in production
//   // const response = await fetch(`${process.env.API_URL}/api/featured?lang=${language}&category=${category}&sort=${sort}`)
//   // const data = await response.json()
//   // return data

//   // For now, we'll simulate database filtering with our mock data
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   let articles = [...featuredArticlesData[language as "en" | "bn"]];

//   // Apply category filter if provided
//   if (category && category !== "all") {
//     articles = articles.filter((article) => article.category === category);
//   }

//   // Apply sorting if provided
//   if (sort) {
//     switch (sort) {
//       case "newest":
//         articles.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         break;
//       case "oldest":
//         articles.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//         );
//         break;
//       case "popular":
//         // In a real app, this would sort by view count or some popularity metric
//         // For now, we'll just use the ID as a proxy for popularity
//         articles.sort((a, b) => Number(b.id) - Number(a.id));
//         break;
//       case "rating":
//         // For articles with ratings
//         articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//     }
//   }

//   return articles;
// }

// export async function getPopularArticles(
//   language = "en",
//   category?: string,
//   sort?: string
// ) {
//   // This would be a real API call in production
//   // const response = await fetch(`${process.env.API_URL}/api/popular?lang=${language}&category=${category}&sort=${sort}`)
//   // const data = await response.json()
//   // return data

//   await new Promise((resolve) => setTimeout(resolve, 100));

//   let articles = [...popularArticlesData[language as "en" | "bn"]];

//   // Apply category filter if provided
//   if (category && category !== "all") {
//     articles = articles.filter((article) => article.category === category);
//   }

//   // Apply sorting if provided
//   if (sort) {
//     switch (sort) {
//       case "newest":
//         articles.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         break;
//       case "oldest":
//         articles.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//         );
//         break;
//       case "popular":
//         // In a real app, this would sort by view count or some popularity metric
//         articles.sort((a, b) => Number(b.id) - Number(a.id));
//         break;
//       case "rating":
//         // For articles with ratings
//         articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//     }
//   }

//   return articles;
// }

// export async function getLatestArticles(
//   language = "en",
//   category?: string,
//   sort?: string
// ) {
//   // This would be a real API call in production
//   // const response = await fetch(`${process.env.API_URL}/api/latest?lang=${language}&category=${category}&sort=${sort}`)
//   // const data = await response.json()
//   // return data

//   await new Promise((resolve) => setTimeout(resolve, 100));

//   let articles = [...latestNewsData[language as "en" | "bn"]];

//   // Apply category filter if provided
//   if (category && category !== "all") {
//     articles = articles.filter((article) => article.category === category);
//   }

//   // Apply sorting if provided
//   if (sort) {
//     switch (sort) {
//       case "newest":
//         articles.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         break;
//       case "oldest":
//         articles.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//         );
//         break;
//       case "popular":
//         // In a real app, this would sort by view count or some popularity metric
//         articles.sort((a, b) => Number(b.id) - Number(a.id));
//         break;
//       case "rating":
//         // For articles with ratings
//         articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//     }
//   }

//   return articles;
// }

// export async function getReviews(
//   language = "en",
//   category?: string,
//   sort?: string
// ) {
//   // This would be a real API call in production
//   // const response = await fetch(`${process.env.API_URL}/api/reviews?lang=${language}&category=${category}&sort=${sort}`)
//   // const data = await response.json()
//   // return data

//   await new Promise((resolve) => setTimeout(resolve, 100));

//   let articles = [...reviewsData[language as "en" | "bn"]];

//   // Apply category filter if provided
//   if (category && category !== "all") {
//     articles = articles.filter((article) => article.category === category);
//   }

//   // Apply sorting if provided
//   if (sort) {
//     switch (sort) {
//       case "newest":
//         articles.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         break;
//       case "oldest":
//         articles.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//         );
//         break;
//       case "popular":
//         // In a real app, this would sort by view count or some popularity metric
//         articles.sort((a, b) => Number(b.id) - Number(a.id));
//         break;
//       case "rating":
//         // For articles with ratings
//         articles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//     }
//   }

//   return articles;
// }

// export async function getCategories(
//   type: "featured" | "popular" | "latest" | "reviews",
//   language = "en"
// ) {
//   // This would be a real API call in production
//   // const response = await fetch(`${process.env.API_URL}/api/categories?type=${type}&lang=${language}`)
//   // const data = await response.json()
//   // return data

//   let articles;
//   switch (type) {
//     case "featured":
//       articles = featuredArticlesData[language as "en" | "bn"];
//       break;
//     case "popular":
//       articles = popularArticlesData[language as "en" | "bn"];
//       break;
//     case "latest":
//       articles = latestNewsData[language as "en" | "bn"];
//       break;
//     case "reviews":
//       articles = reviewsData[language as "en" | "bn"];
//       break;
//   }

//   // Extract unique categories
//   return Array.from(new Set(articles.map((article: any) => article.category)));
// }

// export async function getTranslations(language = "en") {
//   const { t } = await getServerTranslation(language);
//   return t;
// }
