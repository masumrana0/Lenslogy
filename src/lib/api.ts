import { Language } from "@prisma/client";
import { notFound } from "next/navigation";

// lib/get-article.ts
export async function getOneArticle(baseId: string, lang: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/one?baseId=${baseId}&lang=${lang}`,
    { method: "GET", cache: "no-store" }
  );

  if (!res.ok) notFound();

  const data = await res.json();
  return data.data;
}

export async function getHomeAllArticles(lang: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/home?lang=${lang}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 60 } }
  );

  if (!res.ok) notFound();

  const data = await res.json();
  return data.data;
}

export async function getCategories(lang: Language) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?lang=${lang}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.data;
}

export async function getAllArticleWithFilter(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/featured${query}`,
    { method: "GET", cache: "no-cache" }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.data;
}
