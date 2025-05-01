import { NextResponse, NextRequest } from "next/server";
import { unlink } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"; // adjust if needed
import {
  cleanUpFile,
  saveFileToLocal,
  UploadedFile,
} from "@/lib/uploader/uploader";
import { translateContent } from "@/lib/ai/gemenai";
import { ApiErrors } from "../../_essentials/error-handler/errors/api-error";
import { GlobalErrorHandler } from "../../_essentials/error-handler/global-error-handler";
import status from "http-status";
import sendResponse from "../../_essentials/helper/api-response";


// Create Article
export async function POST(req: NextRequest) {
  let uploadedFile: UploadedFile | null = null;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw ApiErrors.Unauthorized("You are not authored");
    }

    const formData = await req.formData();
    const file = formData.get("imgFile") as File;
    const payloadStr = formData.get("payload") as string;

    if (!file) {
      throw ApiErrors.BadRequest("Image file and form data are both required.");
    }

    const [savedFile, payload] = await Promise.all([
      saveFileToLocal(file, { directory: "public/uploads/articles" }),
      Promise.resolve(JSON.parse(payloadStr)),
    ]);

    uploadedFile = savedFile;

    const translatePromise = translateContent({
      title: payload.title,
      excerpt: payload.excerpt,
      content: payload.content,
    });

    const baseArticleData = {
      ...payload,
      lang: "en" as const,
      image: uploadedFile.url,
      authorId: session?.user?.id,
    };

    const baseArticle = await prisma.article.create({
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
      authorId: session!.user.id,
      baseId: baseArticle.baseId,
    };

    const banglaArticle = await prisma.article.create({
      data: banglaArticleData,
    });
    const result = { en: baseArticle, bn: banglaArticle };

    return sendResponse({
      statusCode: status.CREATED,
      message: "Article Created Successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("while i create article then occur this error", error);
    await cleanUpFile(uploadedFile as UploadedFile);
    return GlobalErrorHandler(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;
    const isPublished = searchParams.get("isPublished") || undefined;
    const lang = searchParams.get("lang") || undefined;

    // Build dynamic filter
    const filters: any = {};

    if (title) {
      filters.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured === "true";
    }

    if (isPublished !== undefined) {
      filters.isPublished = isPublished === "true";
    }

    if (lang) {
      filters.lang = lang;
    }

    const articles = await prisma.article.findMany({
      where: filters,
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
        author: true,
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("id");

  if (!articleId) {
    return NextResponse.json(
      { error: "Article ID is required." },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("imgFile") as File;
    const payloadStr = formData.get("payload") as string;

    if (!file || !payloadStr) {
      return NextResponse.json(
        { error: "Image file and form data are both required." },
        { status: 400 }
      );
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

    const updatedBaseArticle = await prisma.article.update({
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
      baseId: updatedBaseArticle.baseId,
    };

    const updatedBanglaArticle = await prisma.article.update({
      where: { id: articleId },
      data: banglaArticleData,
    });

    return NextResponse.json(
      { en: updatedBaseArticle, bn: updatedBanglaArticle },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("id");

  if (!articleId) {
    return NextResponse.json(
      { error: "Article ID is required." },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    // Find the article to delete
    const articleToDelete = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!articleToDelete) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    // Optionally delete the uploaded file
    if (articleToDelete.image) {
      try {
        await unlink(articleToDelete.image);
        console.log("Deleted associated file:", articleToDelete.image);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    // Delete the article
    await prisma.article.deleteMany({
      where: { baseId: articleToDelete.baseId },
    });

    return NextResponse.json(
      { message: "Article deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
