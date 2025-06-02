import { Role } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";
import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import Auth from "../../_core/error-handler/auth";
import { ApiErrors } from "../../_core/errors/api-error";
import { Language } from "@prisma/client";
import { paginationHelpers } from "../../_core/helper/pagination-helper";
import pick from "../../_core/shared/pick";
import {
  articleFilterAbleFields,
  articleSearchableFields,
} from "../../_core/constants/article.constant";
import { paginationFields } from "../../_core/constants/patination.constant";
import { fetchArticle } from "./article.utils";
import { uploader } from "@/lib/uploader/uploader";

// create article
const createArticle = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);
  const formData = await req.formData();

  const file = formData.get("imgFile") as File | null;
  const payloadStr = formData.get("payload") as string | null;

  if (!file || !payloadStr) {
    throw ApiErrors.BadRequest("File and payload are required.");
  }

  // Parallel tasks
  const [savedFile, payload] = await Promise.all([
    uploader.uploadImages([file]),
    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  const image = savedFile;
  const { title, excerpt, content, ...rest } = payload;

  // Base (English) article
  const baseArticle = {
    ...payload,
    image,
    authorId: session!.user.id,
    lang: "en",
  };

  // Translate content to Bangla
  const translated = await translateContent({ title, excerpt, content });

  // Bangla article
  const banglaArticle = {
    ...rest,
    ...translated,
    image,
    authorId: session!.user.id,
    lang: "bn",
  };

  // Save both articles in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const baseData = await tx.article.create({ data: baseArticle });
    const banglaData = await tx.article.create({
      data: {
        ...banglaArticle,
        baseId: baseData.baseId,
      },
    });

    return { en: baseData, bn: banglaData };
  });

  return result;
};

// update Article
const updateArticle = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);

  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("id");
  if (!articleId) throw ApiErrors.BadRequest("Article ID is missing");

  // Check if article exists
  const isExistArticle = await prisma.article.findFirst({
    where: { id: articleId },
  });

  if (!isExistArticle) throw ApiErrors.NotFound("Article not found");

  // Only allow SUPER_ADMIN or the author to update the article
  if (
    session.user.role !== Role.SUPER_ADMIN &&
    isExistArticle.authorId !== session.user.id
  ) {
    throw ApiErrors.BadRequest("You're not authorized to update this article");
  }

  // Get form data
  const formData = await req.formData();

  const file = formData.get("imgFile") as File | null;
  const payloadStr = formData.get("payload") as string | null;
  const updatedBase: Record<string, any> = {};
  const updatedBangla: Record<string, any> = {};

  if (!file && !payloadStr) {
    throw ApiErrors.BadRequest("Required data is missing");
  }

  if (file) {
    const savedFile = await uploader.uploadImages([file]),
      image = savedFile as string;
    updatedBangla.image = savedFile as string;
    updatedBase.image = savedFile as string;
  }

  if (payloadStr) {
    const basePayload = JSON.parse(payloadStr);
    Object.assign(updatedBase, basePayload);
  }

  const { title, excerpt, content, ...others } = updatedBase;
  let translatedContent: any = {};
  if (!title || !excerpt || !content) {
    translatedContent = await translateContent({
      title: title,
      excerpt: excerpt,
      content: content,
    });
  }

  Object.assign(updatedBangla, others);

  if (Object.keys(translatedContent).length > 0) {
    const allData = { ...translatedContent };
    Object.assign(updatedBangla, allData);
  }

  const result = await prisma.$transaction(async (tx) => {
    // Update base (English) article
    const updatedBaseArticle = await tx.article.update({
      where: {
        baseId_lang_unique: {
          baseId: isExistArticle.baseId,
          lang: "en",
        },
      },
      data: {
        ...updatedBase,
      },
    });

    // Update Bangla version
    const updatedBanglaArticle = await tx.article.update({
      where: {
        baseId_lang_unique: {
          baseId: isExistArticle.baseId,
          lang: "bn",
        },
      },
      data: {
        ...updatedBangla,
      },
    });

    return { base: updatedBaseArticle, bn: updatedBanglaArticle };
  });

 if(file){
   await uploader.deleteImage(isExistArticle.image as string);
 }

  return result;
};

// delete Article
const deleteArticle = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("id");

  if (!articleId) throw ApiErrors.BadRequest("Article ID is missing");

  // Check if article exists
  const isExistArticle = await prisma.article.findFirst({
    where: { id: articleId },
  });

  if (!isExistArticle) throw ApiErrors.NotFound("Article not found");

  // Only allow SUPER_ADMIN or the author to delete the article
  if (
    session.user.role !== Role.SUPER_ADMIN &&
    isExistArticle.authorId !== session.user.id
  ) {
    throw ApiErrors.BadRequest("You're not authorized to  delete this article");
  }

  await prisma.article.deleteMany({
    where: { baseId: isExistArticle.baseId },
  });

  await uploader.deleteImage(isExistArticle.image);
};

// getAllArticle for admin
const getAllArticle = async (req: Request) => {
  // Auth guard (optional)
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { searchParams } = new URL(req.url);

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const filters = pick(searchParamsObj, articleFilterAbleFields);

  const paginationOptions = pick(searchParamsObj, paginationFields);

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const searchTerm = searchParamsObj.searchTerm || "";
  const lang = (searchParamsObj.lang || "en") as Language;

  const where: any = {
    lang: lang,
  };

  // Search logic
  if (searchTerm) {
    where.OR = articleSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  // Apply filters
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== "searchTerm") {
      if (value === "true" || value === "false") {
        where[key] = value === "true";
      } else {
        where[key] = value;
      }
    }
  }

  const orderBy: any = {};
  if (sortBy && sortOrder) {
    orderBy[sortBy] = sortOrder.toLowerCase();
  } else {
    orderBy.createdAt = "desc";
  }

  // Fetch articles with populated Category
  const articles = await prisma.article.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      category: true,
    },
  });

  const result = articles.map(async (article) => {
    const { category, ...rest } = article;
    const Category = await prisma.category.findFirst({
      where: { baseId: category!.baseId, lang: lang },
    });

    return {
      ...rest,
      category: Category,
    };
  });
  const formattedResultPromise = await Promise.all(result);

  // Count for pagination
  const total = await prisma.article.count({ where });
  const totalPage = Math.ceil(total / limit);

  return {
    result: formattedResultPromise,
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
  };
};

// get all article  for all
const getAllFeaturedArticle = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const filters = pick(searchParamsObj, articleFilterAbleFields);

  const paginationOptions = pick(searchParamsObj, paginationFields);

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const searchTerm = searchParamsObj.searchTerm || "";
  const sort = searchParamsObj.sort || "newest";
  const lang = (searchParamsObj.lang || "en") as Language;

  const where: any = {
    lang: lang,
    isFeatured: true,
  };

  // Search logic
  if (searchTerm) {
    where.OR = articleSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  // Apply filters
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== "searchTerm") {
      if (value === "true" || value === "false") {
        where[key] = value === "true";
      } else {
        where[key] = value;
      }
    }
  }

  const orderBy: any = {};
  if (sort == "newest") {
    orderBy.createdAt = "desc";
  } else if (sort == "oldest") {
    orderBy.createdAt = "asc";
  }

  // Fetch articles with populated Category
  const articles = await prisma.article.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      category: true,
    },
  });

  const result = articles.map(async (article) => {
    const { category, ...rest } = article;
    const Category = await prisma.category.findFirst({
      where: { baseId: category!.baseId, lang: lang },
    });

    return {
      ...rest,
      category: Category,
    };
  });
  const formattedResultPromise = await Promise.all(result);

  // Count for pagination
  const total = await prisma.article.count({ where });
  const totalPage = Math.ceil(total / limit);

  return {
    result: formattedResultPromise,
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
  };
};

// get all article  for all
const getAllLatestArticle = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const filters = pick(searchParamsObj, articleFilterAbleFields);

  const paginationOptions = pick(searchParamsObj, paginationFields);

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const searchTerm = searchParamsObj.searchTerm || "";
  const sort = searchParamsObj.sort || "newest";
  const lang = (searchParamsObj.lang || "en") as Language;

  const where: any = {
    lang: lang,
    isLatest: true,
  };

  // Search logic
  if (searchTerm) {
    where.OR = articleSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  // Apply filters
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== "searchTerm") {
      if (value === "true" || value === "false") {
        where[key] = value === "true";
      } else {
        where[key] = value;
      }
    }
  }

  const orderBy: any = {};
  if (sort == "newest") {
    orderBy.createdAt = "desc";
  } else if (sort == "oldest") {
    orderBy.createdAt = "asc";
  }

  // Fetch articles with populated Category
  const articles = await prisma.article.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      category: true,
    },
  });

  const result = articles.map(async (article) => {
    const { category, ...rest } = article;
    const Category = await prisma.category.findFirst({
      where: { baseId: category!.baseId, lang: lang },
    });

    return {
      ...rest,
      category: Category,
    };
  });
  const formattedResultPromise = await Promise.all(result);

  // Count for pagination
  const total = await prisma.article.count({ where });
  const totalPage = Math.ceil(total / limit);

  return {
    result: formattedResultPromise,
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
  };
};

const getOneArticle = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("baseId");
  const lang = (searchParams.get("lang") || "en") as Language;

  if (!articleId) throw ApiErrors.BadRequest("Article baseID is missing");

  // Check if article exists
  const isExistArticle = await prisma.article.findUnique({
    where: {
      baseId_lang_unique: { baseId: articleId, lang },
    },

    include: {
      category: true,
      author: true,
    },
  });

  if (!isExistArticle) throw ApiErrors.NotFound("Article not found");
  const Category = await prisma.category.findFirst({
    where: { baseId: isExistArticle!.category!.baseId, lang: lang },
  });

  isExistArticle.category = Category;

  return isExistArticle;
};

// get Pin Featured Article
const getForHomePage = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const lang = (searchParamsObj.lang || "en") as Language;

  const isPinHero = await fetchArticle(
    {
      isPublished: true,
      isPinHero: true,
    },
    lang,
    3
  );

  const getFeatured = await fetchArticle(
    {
      isPublished: true,
      isPinFeatured: true,

      OR: [
        {
          isFeatured: true,
        },
      ],
    },
    lang,
    4
  );

  const getLatest = await fetchArticle(
    {
      isPublished: true,
      isPinLatest: true,
      OR: [
        {
          isLatest: true,
        },
      ],
    },
    lang,
    5
  );

  return {
    isPinHero: isPinHero,
    isPinFeatured: getFeatured,
    isPinLatest: getLatest,
  };
};

// getForNavbar
const getForNavbar = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const lang = (searchParams.get("lang") || "en") as Language;

  const [upcomingRaw, latestRaw, emerging, ai] = await Promise.all([
    fetchArticle({ isGadget: true, isUpComing: true, isPinNav: true }, lang, 3),
    fetchArticle({ isGadget: true, isLatest: true, isPinNav: true }, lang, 3),
    fetchArticle(
      { isHotTech: true, isEmergingTech: true, isPinNav: true },
      lang,
      6
    ),
    fetchArticle(
      {
        isHotTech: true,
        isPinNav: true,

        OR: [
          {
            category: {
              name: "ai",
            },
          },
        ],
      },
      lang,
      6
    ),
  ]);

  const data = {
    navGadget: {
      latest: latestRaw,
      upcoming: upcomingRaw,
    },
    navHotTech: {
      emerging,
      ai,
    },
  };

  return data;
};

export const ArticleService = {
  createArticle,
  deleteArticle,
  updateArticle,
  getAllArticle,
  getAllFeaturedArticle,
  getAllLatestArticle,
  getForHomePage,
  getForNavbar,
  getOneArticle,
};
