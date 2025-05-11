import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const langParam = searchParams.get("lang") as Language | undefined;
    const pinPopularParam = searchParams.get("isPin");
    const isPinPopular = pinPopularParam === "true";

    const where: any = {
      isPublished: true,
      ...(langParam && { lang: langParam }),
      AND: {
        OR: [
          { attachment: { views: { gte: 100 } } },
          { attachment: { likes: { gte: 20 } } },
        ],
      },
    };

    const articles = await prisma.article.findMany({
      where,
      take: isPinPopular ? 6 : 50,
      orderBy: [{ attachment: { likes: "desc" } }, { createdAt: "desc" }],
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
    console.error("GET /api/popular-articles error:", err);
    return NextResponse.json(
      { error: "Unable to fetch popular articles." },
      { status: 500 }
    );
  }
}
