import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const langParam = searchParams.get("lang") as Language | undefined;

    const where: any = {
      isPublished: true,
      isPinHero: true,
      ...(langParam && { lang: langParam }),
    };

    const articles = await prisma.article.findMany({
      where,
      take: 3,
      orderBy: [{ createdAt: "desc" }],
      select: {
        title: true,
        image: true,
        excerpt: true,
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
  } catch (err) {
    // console.error("GET /api/popular-articles error:", err);
    return NextResponse.json(
      { error: "Unable to fetch popular articles." },
      { status: 500 }
    );
  }
}
