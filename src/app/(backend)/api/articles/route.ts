import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateContent } from "@/lib/ai/openai";

// Create Article
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const engArticle = await req.json();
    const { title, excerpt, content } = engArticle;

    // Translate content using OpenAI
    const { bnTitle, bnExcerpt, bnContent } = await translateContent({
      title,
      excerpt,
      content,
    });

    const bangArticle = {
      ...engArticle,
      lang: "bn",
      title: bnTitle,
      excerpt: bnExcerpt,
      content: bnContent,
    };

    // Create English article first (base article)
    const baseArticle = await prisma.article.create({
      data: engArticle,
    });

    // Create Bangla translated article linked to base
    await prisma.article.create({
      data: bangArticle,
    });

    return NextResponse.json(baseArticle, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
