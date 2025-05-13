import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import { ApiErrors } from "../../_core/errors/api-error";
import Auth from "../../_core/error-handler/auth";
import { Role } from "@prisma/client";

// create category
const createCategory = async (req: Request) => {
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { name } = await req.json();

  const translatedPromise = translateContent({ name: name });

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
        name: translated!.name,
        lang: "bn",
        baseId: englishCategory.baseId,
      },
    });

    return { en: englishCategory, bn: banglaCategory };
  });

  return result;
};

// get All Category
const getAllCategory = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  const result = await prisma.category.findMany({
    where: {
      lang: lang === "bn" ? "bn" : "en",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

//  Update category
const updateCategory = async (req: Request) => {
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");
  if (!categoryId) throw ApiErrors.BadRequest("Category ID is missing");

  // Get current category info to fetch baseId early
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw ApiErrors.NotFound("Category not found");

  const { name } = await req.json();
  if (!name) throw ApiErrors.BadRequest("name are required");

  // Prepare translated content (can run in parallel with other async ops)
  const translatedPromise = translateContent({ name: name });

  // Start transaction for consistency
  const result = await prisma.$transaction(async (tx) => {
    const updatedBase = await tx.category.update({
      where: { id: categoryId },
      data: { name },
    });

    const translated = await translatedPromise;

    const updatedBn = await tx.category.update({
      where: {
        baseId_lang_unique: {
          baseId: updatedBase.baseId,
          lang: "bn",
        },
      },
      data: { name: translated!.name },
    });

    return { en: updatedBase, bn: updatedBn };
  });

  return result;
};

// deleteCategory
const deleteCategory = async (req: Request) => {
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");
  if (!categoryId) throw ApiErrors.BadRequest("Category ID is missing");

  // Get current category info to fetch baseId early
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) throw ApiErrors.NotFound("Category not found");

  // Start transaction for consistency

  await prisma.category.deleteMany({
    where: {
      baseId: category.baseId,
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
