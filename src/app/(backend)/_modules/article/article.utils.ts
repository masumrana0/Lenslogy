import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export const fetchArticle = async (
  filters: Partial<(typeof prisma.article.findFirst)["arguments"]["where"]>,
  lang: Language,
  take: number,
) => {
  const article = await prisma.article.findMany({
    where: { ...filters, lang: lang },
    take: take,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  if (!article) return null;

  const result = await Promise.all(
    article.map(async (art) => {
      const { category, ...rest } = art;
      const Category = await prisma.category.findFirst({
        where: { baseId: category!.baseId, lang },
      });
      return { ...rest, category: Category };
    })
  );

  return result;
};
