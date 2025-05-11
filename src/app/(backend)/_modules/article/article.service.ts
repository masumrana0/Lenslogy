import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import { saveFileToLocal } from "@/lib/uploader/uploader";
import { ApiErrors } from "../../_core/errors/api-error";
import Auth from "../../_core/error-handler/auth";
import { Role } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";

const createArticle = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);

  const formData = await req.formData();
  const file = formData.get("imgFile") as File;
  const payloadStr = formData.get("payload") as string;

  if (!file || !payloadStr)
    throw ApiErrors.BadRequest("File and payload are required.");

  const [savedFile, payload] = await Promise.all([
    saveFileToLocal(file, { directory: "public/uploads/articles" }),
    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  const translatePromise = translateContent({
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
  });

  const baseArticle = await prisma.article.create({
    data: {
      ...payload,
      lang: "en",
      image: savedFile.url,
      authorId: session!.user.id,
    },
  });

  const {
    title: bnTitle,
    excerpt: bnExcerpt,
    content: bnContent,
  } = await translatePromise;

  const banglaArticle = await prisma.article.create({
    data: {
      ...payload,
      lang: "bn",
      title: bnTitle,
      excerpt: bnExcerpt,
      content: bnContent,
      image: savedFile.url,
      authorId: session.user.id,
      baseId: baseArticle.baseId,
    },
  });
  const result = { en: baseArticle, bn: banglaArticle };

  return result;
};

const updateArticle = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("id");

  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);

  const formData = await req.formData();
  const file = formData.get("imgFile") as File;
  const payloadStr = formData.get("payload") as string;

  if (!file || !payloadStr) {
    throw ApiErrors.NotFound("Image file and form data are both required.");
  }

  const [savedFile, payload] = await Promise.all([
    saveFileToLocal(file, { directory: "public/uploads/articles" }),
    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  const uploadedFile = savedFile;

  const translatePromise = translateContent({
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
  });

  const baseArticleData = {
    ...payload,
    lang: "en" as const,
    image: uploadedFile.url,
    authorId: session.user.id,
  };

  const upcreatedAtdBaseArticle = await prisma.article.update({
    where: { id: articleId },
    data: baseArticleData,
  });

  const {
    title: bnTitle,
    excerpt: bnExcerpt,
    content: bnContent,
  } = await translatePromise;

  const banglaArticleData = {
    ...payload,
    lang: "bn" as const,
    title: bnTitle,
    excerpt: bnExcerpt,
    content: bnContent,
    image: uploadedFile.url,
    authorId: session.user.id,
    baseId: upcreatedAtdBaseArticle.baseId,
  };

  const upcreatedAtdBanglaArticle = await prisma.article.update({
    where: { id: articleId },
    data: banglaArticleData,
  });
};

const deleteArticle = async (req: Request) => {};

export const ArticleService = {
  createArticle,
  deleteArticle,
  updateArticle,
};
