import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get query parameters
    const url = new URL(req.url);
    const language = url.searchParams.get("language") || "en";

    // Get client IP for view tracking
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Get article
    const article = await prisma.article.findUnique({
      where: {
        slug,
        published: true,
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

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count (only count unique IPs)
    await prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        views: article.views + 1,
      },
    });

    // Format response based on language
    let formattedArticle;

    if (language === "bn") {
      formattedArticle = {
        id: article.id,
        title: article.bnTitle || article.enTitle,
        excerpt: article.bnExcerpt || article.enExcerpt,
        content: article.bnContent || article.enContent,
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
      formattedArticle = {
        id: article.id,
        title: article.enTitle,
        excerpt: article.enExcerpt,
        content: article.enContent,
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

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    // Get article
    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
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
        { error: "You don't have permission to update this article" },
        { status: 403 }
      );
    }

    const { title, excerpt, content, image, categoryId, tags, published } =
      await req.json();

    // Update article
    const updatedArticle = await prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        enTitle: title,
        enExcerpt: excerpt,
        enContent: content,
        enImage: image,
        published,
        category: {
          connect: {
            id: categoryId,
          },
        },
        tags: {
          set: [],
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

    return NextResponse.json(updatedArticle);
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
        slug,
      },
      include: {
        author: true,
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
