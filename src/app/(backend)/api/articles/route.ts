import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateContent } from "@/lib/openai";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      excerpt,
      content,
      image,
      categoryId,
      tags,
      published = false,
    } = await req.json();

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (existingArticle) {
      return NextResponse.json(
        { error: "An article with this title already exists" },
        { status: 400 }
      );
    }

    // Translate content using OpenAI
    const { bnTitle, bnExcerpt, bnContent } = await translateContent({
      title,
      excerpt,
      content,
    });

    // Create article
    const article = await prisma.article.create({
      data: {
        slug,
        enTitle: title,
        enExcerpt: excerpt,
        enContent: content,
        enImage: image,
        bnTitle,
        bnExcerpt,
        bnContent,
        bnImage: image, // Using same image for both languages
        published,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        tags: {
          connect: tags.map((tagId: string) => ({ id: tagId })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            designation: true,
            avatar: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const language = url.searchParams.get("language") || "en";
    const category = url.searchParams.get("category");
    const popular = url.searchParams.get("popular") === "true";
    const limit = Number.parseInt(url.searchParams.get("limit") || "10");
    const page = Number.parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const where: any = {
      published: true,
    };

    if (category) {
      where.category = {
        name: category,
      };
    }

    if (popular) {
      where.views = {
        gte: 500,
      };
    }

    // Get articles
    const articles = await prisma.article.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            designation: true,
            avatar: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    // Get total count
    const total = await prisma.article.count({ where });

    // Format response based on language
    const formattedArticles = articles.map((article) => {
      if (language === "bn") {
        return {
          id: article.id,
          title: article.bnTitle || article.enTitle,
          excerpt: article.bnExcerpt || article.enExcerpt,
          image: article.bnImage || article.enImage,
          category: article.category.bnName || article.category.enName,
          author: article.author,
          date: article.createdAt.toISOString(),
          tags: article.tags.map((tag) => tag.bnName || tag.enName),
          views: article.views,
          likes: article.likes,
          slug: article.slug,
        };
      } else {
        return {
          id: article.id,
          title: article.enTitle,
          excerpt: article.enExcerpt,
          image: article.enImage,
          category: article.category.enName,
          author: article.author,
          date: article.createdAt.toISOString(),
          tags: article.tags.map((tag) => tag.enName),
          views: article.views,
          likes: article.likes,
          slug: article.slug,
        };
      }
    });

    return NextResponse.json({
      articles: formattedArticles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
