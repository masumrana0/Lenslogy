import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { ApiError } from "next/dist/server/api-utils";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    throw new ApiError(500, "something is wrong");
    const { slug } = params;

    // Get query parameters

    // Get article
    const article = await prisma.article.findUnique({
      where: {
        id: slug,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Format response based on language
    let formattedArticle;

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    const article = await prisma.article.findUnique({
      where: { id: slug },
      include: { author: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const userRole = session.user.role;
    const isAuthor = article.authorId === session.user.id;

    if (!isAuthor && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to update this article" },
        { status: 403 }
      );
    }

    const payload = await req.json();
    const { title, excerpt, content, image, category, tags } = payload;

    const englishUpdateData: Record<string, any> = {};
    const shouldTranslate: Record<string, string> = {};

    // Check for content fields (translation needed)
    if (title) {
      englishUpdateData.title = title;
      shouldTranslate.title = title;
    }
    if (excerpt) {
      englishUpdateData.excerpt = excerpt;
      shouldTranslate.excerpt = excerpt;
    }
    if (content) {
      englishUpdateData.content = content;
      shouldTranslate.content = content;
    }

    // Check for non-translatable shared fields
    if (image) englishUpdateData.image = image;
    if (category) englishUpdateData.category = category;
    if (tags) englishUpdateData.tags = tags;

    // Translate only if necessary
    let bnTranslated = null;
    if (Object.keys(shouldTranslate).length > 0) {
      bnTranslated = await translateContent(shouldTranslate);
    }

    // Update English article
    const updatedEnglish = await prisma.article.update({
      where: { id: article.id },
      data: englishUpdateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            designation: true,
            avatar: true,
          },
        },
      },
    });

    // Update Bangla article if it exists (linked via baseId)
    const banglaArticle = await prisma.article.findFirst({
      where: {
        baseId: article.lang === "en" ? article.id : article.baseId!,
        lang: "bn",
      },
    });

    if (banglaArticle) {
      const banglaUpdateData: Record<string, any> = {};

      // Add translated content if present
      if (bnTranslated?.bnTitle) banglaUpdateData.title = bnTranslated.bnTitle;
      if (bnTranslated?.bnExcerpt)
        banglaUpdateData.excerpt = bnTranslated.bnExcerpt;
      if (bnTranslated?.bnContent)
        banglaUpdateData.content = bnTranslated.bnContent;

      // Add non-translatable shared fields (if updated)
      if (image) banglaUpdateData.image = image;
      if (category) banglaUpdateData.category = category;
      if (tags) banglaUpdateData.tags = tags;

      if (Object.keys(banglaUpdateData).length > 0) {
        await prisma.article.update({
          where: { id: banglaArticle.id },
          data: banglaUpdateData,
        });
      }
    }

    return NextResponse.json(updatedEnglish);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    // Get article
    const article = await prisma.article.findUnique({
      where: {
        id: slug,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Check if user is the author or has admin/super-admin role
    const userRole = session.user.role;
    const isAuthor = article.authorId === session.user.id;

    if (!isAuthor && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to delete this article" },
        { status: 403 }
      );
    }

    // Delete article
    await prisma.article.delete({
      where: {
        id: article.id,
      },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
