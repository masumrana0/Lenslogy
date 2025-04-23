import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { saveFileToLocal } from "@/lib/uploader/uploader";
import { unlink } from "fs/promises";
import { getServerSession } from "next-auth/next";
import { type NextRequest, NextResponse } from "next/server";

// Create Article
export async function POST(req: NextRequest) {
  let uploadedFile = null;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("imgFile") as File;
    const payloadStr = formData.get("payload") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    if (!payloadStr) {
      return NextResponse.json(
        { error: "Payload data is required" },
        { status: 400 }
      );
    }

    // Parse the payload first to validate it
    const payload = JSON.parse(payloadStr);

    // Translate content using AI before file operations
    const {
      title: bnTitle,
      excerpt: bnExcerpt,
      content: bnContent,
    } = await translateContent({
      title: payload.title,
      excerpt: payload.excerpt,
      content: payload.content,
    });

    // Save the file temporarily
    try {
      uploadedFile = await saveFileToLocal(file, {
        directory: "public/uploads/articles",
      });
      console.log("File saved temporarily:", uploadedFile);
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json(
        { error: "Failed to save image file" },
        { status: 500 }
      );
    }

    // Prepare article data with image URL
    const articleData = {
      ...payload,
      lang: "en",
      image: uploadedFile.url,
      authorId: session.user.id,
    };

    const bangArticle = {
      ...payload,
      lang: "bn",
      title: bnTitle,
      excerpt: bnExcerpt,
      content: bnContent,
      image: uploadedFile.url,
      authorId: session.user.id,
    };

    try {
      // Use Prisma transaction to ensure both articles are created or none
      const baseArticle = await prisma.article.create({
        data: articleData,
      });

      const createdBangArticle = await prisma.article.create({
        data: {
          ...bangArticle,
          baseId: baseArticle.baseId,
        },
      });

      

      // If we reach here, both database operations succeeded
      return NextResponse.json(
        { en: baseArticle, bn: createdBangArticle },
        { status: 201 }
      );
    } catch (dbError) {
      // If database operations fail, delete the uploaded file
      if (uploadedFile && uploadedFile.path) {
        try {
          await unlink(uploadedFile.path);
          console.log("Cleaned up temporary file after database error");
        } catch (unlinkError) {
          console.error("Error cleaning up temporary file:", unlinkError);
        }
      }

      throw dbError; // Re-throw to be caught by outer catch block
    }
  } catch (error) {
    console.error("Error creating article:", error);

    // Clean up the uploaded file if it exists and wasn't already cleaned up
    if (uploadedFile && uploadedFile.path) {
      try {
        await unlink(uploadedFile.path);
        console.log("Cleaned up temporary file after error");
      } catch (unlinkError) {
        console.error("Error cleaning up temporary file:", unlinkError);
      }
    }

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
