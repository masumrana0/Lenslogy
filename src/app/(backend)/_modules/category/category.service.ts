import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { ApiErrors } from "../../_core/errors/api-error";

// create category
const createCategory = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw ApiErrors.Unauthorized();
  }

  const userRole = session.user.role;
  if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
    throw ApiErrors.Forbidden();
  }

  const { name } = await req.json();

  const translatedPromise = await translateContent({ name: name });

  const result = await prisma.$transaction(async (tx) => {
    const englishCategory = await tx.category.create({
      data: {
        name,
        lang: "en",
      },
    });

    const translated = await translatedPromise;

    const banglaCategory = await prisma.category.create({
      data: {
        name: translated.name,
        lang: "bn",
        baseId: englishCategory.baseId,
      },
    });

    return { en: englishCategory, bn: banglaCategory };
  });

  return result;
};

// get All Category
// const getAllCategory = async (req: Request) => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     throw ApiErrors.Unauthorized();
//   }
//   const { searchParams } = new URL(req.url);
//   const lang = searchParams.get("lang") || "en";

//   const result = await prisma.category.findMany({
//     where: {
//       lang: lang === "bn" ? "bn" : "en",
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return result;
// };

// upcreatedAt category
// const upcreatedAtCategory = async (req: Request) => {
//   const session = await getServerSession(authOptions);
//   if (!session) throw ApiErrors.Unauthorized();

//   const userRole = session!.user!.role;
//   if (!["SUPER_ADMIN", "ADMIN"].includes(userRole as string)) {
//     throw ApiErrors.Forbidden("You don't have permission to upcreatedAt categories");
//   }

//   const { id, name } = await req.json();
//   if (!id || !name) throw ApiErrors.BadRequest("ID and name are required");

//   // Get current category info to fetch baseId early
//   const category = await prisma.category.findUnique({
//     where: { id },
//   });

//   if (!category) throw ApiErrors.NotFound("Category not found");

//   // Prepare translated content (can run in parallel with other async ops)
//   const translatedPromise = translateContent({ name: name });

//   // Start transaction for consistency
//   const result = await prisma.$transaction(async (tx) => {
//     const upcreatedAtdEN = await tx.category.upcreatedAt({
//       where: { id },
//       data: { name },
//     });

//     const translated = await translatedPromise;

//     const upcreatedAtdBN = await tx.category.upcreatedAtMany({
//       where: { baseId: category.baseId, lang: "bn" },
//       data: { name: translated.name },
//     });

//     return { en: upcreatedAtdEN, bn: upcreatedAtdBN };
//   });

//   return result;
// };

// export const CategoryService = {
//   createCategory,
//   getAllCategory,
//   upcreatedAtCategory,
// };
