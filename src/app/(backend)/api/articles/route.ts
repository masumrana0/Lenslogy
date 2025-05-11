import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { saveFileToLocal } from "@/lib/uploader/uploader";
import { unlink } from "fs/promises";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
 
import { ArticleController } from "../../_modules/article/article.controller";

export const POST = ArticleController.createArticle;

 

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
