import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const langParam = searchParams.get("lang") as Language | undefined;
    const isPinlatestParam = searchParams.get("isPin");
    const isLatest = isPinlatestParam === "true";

    const where = {
      isPublished: true,
      ...(langParam && { lang: langParam }),
    };

    const articles = await prisma.article.findMany({
      where,
      take: isLatest ? 6 : 50,
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        excerpt: true,
        image: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            avatar: true,
            designation: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ data: articles }, { status: 200 });
  } catch (error) {
    console.error("GET /api/latest-articles error:", error);
    return NextResponse.json(
      { error: "Unable to fetch latest articles." },
      { status: 500 }
    );
  }
}
