import Auth from "@/app/(backend)/_core/error-handler/auth";
import { ApiErrors } from "@/app/(backend)/_core/errors/api-error";
import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";

import { Language, Role } from "@prisma/client";

// create category
const createCategory = async (req: Request) => {
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { name } = await req.json();

  const isExistedCategory = await prisma.category.findUnique({
    where: {
      name: name,
      lang: "en",
    },
  });

  if (isExistedCategory) {
    throw ApiErrors.BadRequest(
      "This category name already exists. Please try another."
    );
  }

  const translated = await translateContent({ name });

  const result = await prisma.$transaction(async (tx) => {
    const englishCategory = await tx.category.create({
      data: {
        name,
        lang: "en",
      },
    });

    const banglaCategory = await tx.category.create({
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
  const lang = (searchParams.get("lang") || "en") as Language;

  const result = await prisma.category.findMany({
    where: {
      lang: lang,
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
  if (!name) throw ApiErrors.BadRequest("Edited text are required");

  const isExistedCategory = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });
  if (isExistedCategory)
    throw ApiErrors.BadRequest(
      "This category name already existed.Please try to edit unique"
    );

  // Prepare translated content (can run in parallel with other async ops)
  const translated = await translateContent({ name: name });

  // Start transaction for consistency
  const result = await prisma.$transaction(async (tx) => {
    const updatedBase = await tx.category.update({
      where: { id: categoryId },
      data: { name },
    });

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
  const categoryBaseId = searchParams.get("baseId");

  if (!categoryBaseId)
    throw ApiErrors.BadRequest("Category Base ID is missing");

  await prisma.category.deleteMany({
    where: {
      baseId: categoryBaseId,
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
