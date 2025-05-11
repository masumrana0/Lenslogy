// import { translateContent } from "@/lib/ai/gemenai";
// import { authOptions } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { ApiError } from "next/dist/server/api-utils";
// import { type NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     throw new ApiError(500, "something is wrong");
//     const { slug } = params;

//     // Get query parameters

//     // Get article
//     const article = await prisma.article.findUnique({
//       where: {
//         id: slug,
//       },
//     });

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     // Format response based on language
//     let formattedArticle;

//     return NextResponse.json(formattedArticle);
//   } catch (error) {
//     console.error("Error fetching article:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch article" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { slug } = params;

//     const article = await prisma.article.findUnique({
//       where: { id: slug },
//       include: { author: true },
//     });

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     const userRole = session.user.role;
//     const isAuthor = article.authorId === session.user.id;

//     if (!isAuthor && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
//       return NextResponse.json(
//         { error: "You don't have permission to upcreatedAt this article" },
//         { status: 403 }
//       );
//     }

//     const payload = await req.json();
//     const { title, excerpt, content, image, category, tags } = payload;

//     const englishUpcreatedAtData: Record<string, any> = {};
//     const shouldTranslate: Record<string, string> = {};

//     // Check for content fields (translation needed)
//     if (title) {
//       englishUpcreatedAtData.title = title;
//       shouldTranslate.title = title;
//     }
//     if (excerpt) {
//       englishUpcreatedAtData.excerpt = excerpt;
//       shouldTranslate.excerpt = excerpt;
//     }
//     if (content) {
//       englishUpcreatedAtData.content = content;
//       shouldTranslate.content = content;
//     }

//     // Check for non-translatable shared fields
//     if (image) englishUpcreatedAtData.image = image;
//     if (category) englishUpcreatedAtData.category = category;
//     if (tags) englishUpcreatedAtData.tags = tags;

//     // Translate only if necessary
//     let bnTranslated = null;
//     if (Object.keys(shouldTranslate).length > 0) {
//       bnTranslated = await translateContent(shouldTranslate);
//     }

//     // UpcreatedAt English article
//     const upcreatedAtdEnglish = await prisma.article.findMany({
//       where: { id: article.id },
//       data: englishUpcreatedAtData,
//       include: {
//         author: {
//           select: {
//             id: true,
//             name: true,
//             designation: true,
//             avatar: true,
//           },
//         },
//       },
//     });

//     // UpcreatedAt Bangla article if it exists (linked via baseId)
//     const banglaArticle = await prisma.article.findFirst({
//       where: {
//         baseId: article.lang === "en" ? article.id : article.baseId!,
//         lang: "bn",
//       },
//     });

//     if (banglaArticle) {
//       const banglaUpcreatedAtData: Record<string, any> = {};

//       // Add translated content if present
//       if (bnTranslated?.bnTitle)
//         banglaUpcreatedAtData.title = bnTranslated.bnTitle;
//       if (bnTranslated?.bnExcerpt)
//         banglaUpcreatedAtData.excerpt = bnTranslated.bnExcerpt;
//       if (bnTranslated?.bnContent)
//         banglaUpcreatedAtData.content = bnTranslated.bnContent;

//       // Add non-translatable shared fields (if upcreatedAtd)
//       if (image) banglaUpcreatedAtData.image = image;
//       if (category) banglaUpcreatedAtData.category = category;
//       if (tags) banglaUpcreatedAtData.tags = tags;

//       if (Object.keys(banglaUpcreatedAtData).length > 0) {
//         await prisma.article.({
//           where: { id: banglaArticle.id },
//           data: banglaUpcreatedAtData,
//         });
//       }
//     }

//     return NextResponse.json(upcreatedAtdEnglish);
//   } catch (error) {
//     console.error("Error updating article:", error);
//     return NextResponse.json(
//       { error: "Failed to upcreatedAt article" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     // Check if user is authenticated
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { slug } = params;

//     // Get article
//     const article = await prisma.article.findUnique({
//       where: {
//         id: slug,
//       },
//     });

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     // Check if user is the author or has admin/super-admin role
//     const userRole = session.user.role;
//     const isAuthor = article.authorId === session.user.id;

//     if (!isAuthor && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
//       return NextResponse.json(
//         { error: "You don't have permission to delete this article" },
//         { status: 403 }
//       );
//     }

//     // Delete article
//     await prisma.article.delete({
//       where: {
//         id: article.id,
//       },
//     });

//     return NextResponse.json({ message: "Article deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting article:", error);
//     return NextResponse.json(
//       { error: "Failed to delete article" },
//       { status: 500 }
//     );
//   }
// }
