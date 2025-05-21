import { Role } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";
import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import { cleanUpFile, saveFileToLocal } from "@/lib/uploader/uploader";
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
    saveFileToLocal(file, { directory: "public/uploads/articles" }),
    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  const image = savedFile.url;
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

  console.log("Base Article:", baseArticle);

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
  const updatedBase: any = {};
  const updatedBangla: any = {};

  if (!file && !payloadStr) {
    throw ApiErrors.BadRequest("Required data is missing");
  }

  if (file) {
    const savedFile = await saveFileToLocal(file, {
      directory: "public/uploads/articles",
    });
    updatedBase.image = savedFile.url;
    updatedBangla.image = savedFile.url;
  }

  if (payloadStr) {
    const basePayload = JSON.parse(payloadStr);
    Object.assign(updatedBase, basePayload);
  }

  const { title, excerpt, content, ...others } = updatedBase;

  const translatedContent = await translateContent({
    title: title,
    excerpt: excerpt,
    content: content,
  });

  if (translatedContent) {
    const allData = { ...others, translatedContent };
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
  console.log("Deleting file:", isExistArticle.image);

  await cleanUpFile(isExistArticle.image);
};

// getAllArticle for admin
const getAllArticle = async (req: Request) => {
  // Auth guard (optional)
  // await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

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

    Category: {
      lang,
    },
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

  console.log(where);
  // Sorting
  const orderBy: any = {};
  if (sortBy && sortOrder) {
    orderBy[sortBy] = sortOrder.toLowerCase();
  } else {
    orderBy.createdAt = "desc";
  }

  // Fetch articles with populated Category
  const result = await prisma.article.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      Category: true,
    },
  });

  // Count for pagination
  const total = await prisma.article.count({ where });
  const totalPage = Math.ceil(total / limit);

  return {
    result,
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
  };
};

export const ArticleService = {
  createArticle,
  deleteArticle,
  updateArticle,
  getAllArticle,
};
