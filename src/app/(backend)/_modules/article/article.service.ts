import { Role } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";
import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import { saveFileToLocal } from "@/lib/uploader/uploader";
import Auth from "../../_core/error-handler/auth";
import { ApiErrors } from "../../_core/errors/api-error";

const createArticle = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);
  const formData = await req.formData();
  const file = formData.get("imgFile") as File;
  const payloadStr = formData.get("payload") as string;
  const baseArticle: any = { authorId: session!.user.id, lang: "en" };
  const banglaArticle: any = { authorId: session!.user.id, lang: "bn" };

  if (!file || !payloadStr)
    throw ApiErrors.BadRequest("File and payload are required.");

  const [savedFile, payload] = await Promise.all([
    saveFileToLocal(file, { directory: "public/uploads/articles" }),
    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  if (savedFile) {
    baseArticle.Image = savedFile.url;
    banglaArticle.image = savedFile.url;
  }

  if (payload) {
    Object.assign(baseArticle, payload);
  }

  const translatedContent = await translateContent({
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
  });

  if (translatedContent) {
    Object.assign(banglaArticle, translatedContent);
  }

  const result = await prisma.$transaction(async (tx: any) => {
    const baseData = await tx.article.create({
      data: {
        ...baseArticle,
      },
    });

    const banglaData = await tx.article.create({
      data: { ...banglaArticle, baseId: baseData.baseId },
    });

    return { en: baseData, bn: banglaData };
  });

  return result;
};

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

  const translatedContent = await translateContent({
    title: updatedBase?.title,
    excerpt: updatedBase?.excerpt,
    content: updatedBase?.content,
  });

  if (translatedContent) {
    Object.assign(updatedBangla, translatedContent);
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
};

export const ArticleService = {
  createArticle,
  deleteArticle,
  updateArticle,
};
