import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Pull out your optional filters
    const langParam = searchParams.get("lang") as Language | undefined;
    const isPinFeaturedParam = searchParams.get("isPin");
    const categoryIdParam = searchParams.get("categoryId");
    // default sort order
    const sortOrder = (searchParams.get("sort") as "asc" | "desc") || "desc";

    // Build only the filters you need
    const where: {
      isPublished: true;
      lang?: Language;
      isPinFeatured?: boolean;
      isFeatured?: boolean;
      categoryId?: string;
    } = {
      isPublished: true,
      isFeatured: true,
      ...(langParam && { lang: langParam }),
      ...(isPinFeaturedParam !== null && {
        isPinFeatured: isPinFeaturedParam === "true",
      }),

      ...(categoryIdParam && { categoryId: categoryIdParam }),
    };

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: sortOrder },
      include: {
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
    // console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: error || "Unable to fetch articles." },
      { status: 500 }
    );
  }
}
