import { Language, Role } from "@prisma/client";
import Auth from "../../_core/error-handler/auth";
import { ApiErrors } from "../../_core/errors/api-error";
import { uploader } from "@/lib/uploader/uploader";
import { translateContent } from "@/lib/ai/gemenai";
import prisma from "@/lib/prisma";
import { File } from "buffer";
import {
  gadgetFilterAbleFields,
  gadgetSearchableFields,
} from "../../_core/constants/gadget.constant";
import { paginationFields } from "../../_core/constants/patination.constant";
import pick from "../../_core/shared/pick";
import { paginationHelpers } from "../../_core/helper/pagination-helper";

const createGadget = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);
  const formData = await req.formData();

  const file = formData.get("imgFile") as File | null;
  const files = formData.get("imgFiles") as File | null;
  const payloadStr = formData.get("payload") as string | null;

  if (!file || !files || !payloadStr) {
    throw ApiErrors.BadRequest("File and payload are required.");
  }

  // Parallel tasks
  const [savedFile, savedFiles, payload] = await Promise.all([
    uploader.uploadImages([file]),
    uploader.uploadImages(files as unknown as File[]),

    Promise.resolve(JSON.parse(payloadStr)),
  ]);

  const image = savedFile[0].fileUrl;
  const images = savedFiles.filter.map(
    (ele: Record<any, string>) => ele.fileUrl
  );
  const { title, excerpt, content, ...rest } = payload;

  // Base (English) Gadget
  const baseGadget = {
    ...payload,
    image,
    images,
    authorId: session!.user.id,
    lang: "en",
  };

  // Translate content to Bangla
  const translated = await translateContent({ title, excerpt, content });

  // Bangla Gadget
  const banglaGadget = {
    ...rest,
    ...translated,
    image,
    authorId: session!.user.id,
    lang: "bn",
  };

  // Save both Gadgets in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const baseData = await tx.gadget.create({ data: baseGadget });
    const banglaData = await tx.gadget.create({
      data: {
        ...banglaGadget,
        baseId: baseData.baseId,
      },
    });

    return { en: baseData, bn: banglaData };
  });

  return result;
};

// update Gadget
const updateGadget = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);

  const { searchParams } = new URL(req.url);
  const GadgetId = searchParams.get("id");
  if (!GadgetId) throw ApiErrors.BadRequest("Gadget ID is missing");

  // Check if Gadget exists
  const isExistGadget = await prisma.gadget.findFirst({
    where: { id: GadgetId },
  });

  if (!isExistGadget) throw ApiErrors.NotFound("Gadget not found");

  // Only allow SUPER_ADMIN or the author to update the Gadget
  if (
    session.user.role !== Role.SUPER_ADMIN &&
    isExistGadget.authorId !== session.user.id
  ) {
    throw ApiErrors.BadRequest("You're not authorized to update this Gadget");
  }

  // Get form data
  const formData = await req.formData();

  const file = formData.get("imgFile") as File | null;
  const files = formData.get("imgFiles");
  const payloadStr = formData.get("payload") as string | null;
  const updatedBase: Record<string, any> = {};
  const updatedBangla: Record<string, any> = {};

  if (!file && !files && !payloadStr) {
    throw ApiErrors.BadRequest("Required data is missing");
  }

  if (file) {
    const savedFile = await uploader.uploadImages([file as any]),
      image = savedFile as string;
    updatedBangla.image = savedFile as string;
    updatedBase.image = savedFile as string;
  }

  if (files) {
    const savedFiles = await uploader.uploadImages(files as any),
      images = savedFiles as string;
    updatedBangla.images = savedFiles as string;
    updatedBase.images = savedFiles as string;
  }

  if (payloadStr) {
    const basePayload = JSON.parse(payloadStr);
    Object.assign(updatedBase, basePayload);
  }

  const { title, excerpt, content, ...others } = updatedBase;
  let translatedContent: any = {};
  if (!title || !excerpt || !content) {
    translatedContent = await translateContent({
      title: title,
      excerpt: excerpt,
      content: content,
    });
  }

  Object.assign(updatedBangla, others);

  if (Object.keys(translatedContent).length > 0) {
    const allData = { ...translatedContent };
    Object.assign(updatedBangla, allData);
  }

  const result = await prisma.$transaction(async (tx) => {
    // Update base (English) Gadget
    const updatedBaseGadget = await tx.gadget.update({
      where: {
        baseId_lang_unique: {
          baseId: isExistGadget.baseId,
          lang: "en",
        },
      },
      data: {
        ...updatedBase,
      },
    });

    // Update Bangla version
    const updatedBanglaGadget = await tx.gadget.update({
      where: {
        baseId_lang_unique: {
          baseId: isExistGadget.baseId,
          lang: "bn",
        },
      },
      data: {
        ...updatedBangla,
      },
    });

    return { base: updatedBaseGadget, bn: updatedBanglaGadget };
  });

  if (file) {
    await uploader.deleteImage(isExistGadget.image as string);
  }

  return result;
};

// delete Gadget
const deleteGadget = async (req: Request) => {
  const session = await Auth([Role.ADMIN, Role.SUPER_ADMIN, Role.AUTHOR]);
  const { searchParams } = new URL(req.url);
  const GadgetId = searchParams.get("id");

  if (!GadgetId) throw ApiErrors.BadRequest("Gadget ID is missing");

  // Check if Gadget exists
  const isExistGadget = await prisma.gadget.findFirst({
    where: { id: GadgetId },
  });

  if (!isExistGadget) throw ApiErrors.NotFound("Gadget not found");

  // Only allow SUPER_ADMIN or the author to delete the Gadget
  if (
    session.user.role !== Role.SUPER_ADMIN &&
    isExistGadget.authorId !== session.user.id
  ) {
    throw ApiErrors.BadRequest("You're not authorized to  delete this Gadget");
  }

  await prisma.gadget.deleteMany({
    where: { baseId: isExistGadget.baseId },
  });

  await uploader.deleteImage(isExistGadget.image);
  isExistGadget.images.forEach(async (img) => {
    await uploader.deleteImage(img);
  });
};

// getAllGadget for admin
const getAllGadget = async (req: Request) => {
  // Auth guard (optional)
  await Auth([Role.ADMIN, Role.SUPER_ADMIN]);

  const { searchParams } = new URL(req.url);

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const filters = pick(searchParamsObj, gadgetFilterAbleFields);

  const paginationOptions = pick(searchParamsObj, paginationFields);

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const searchTerm = searchParamsObj.searchTerm || "";
  const lang = (searchParamsObj.lang || "en") as Language;

  const where: any = {
    lang: lang,
  };

  // Search logic
  if (searchTerm) {
    where.OR = gadgetSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  // Apply filters
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== "searchTerm") {
      if (value === "true" || value === "false") {
        where[key] = value === "true";
      } else {
        where[key] = value;
      }
    }
  }

  const orderBy: any = {};
  if (sortBy && sortOrder) {
    orderBy[sortBy] = sortOrder.toLowerCase();
  } else {
    orderBy.createdAt = "desc";
  }

  // Fetch Gadgets with populated Category
  const Gadgets = await prisma.gadget.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      brand: true,
      type: true,
    },
  });

  const result = Gadgets.map(async (Gadget) => {
    const { brand, type, ...rest } = Gadget;
    const Brand = await prisma.gadgetBrand.findFirst({
      where: { baseId: brand!.baseId, lang: lang },
    });
    const Type = await prisma.gadgetBrand.findFirst({
      where: { baseId: type!.baseId, lang: lang },
    });

    return {
      ...rest,
      brand: Brand,
      type: Type,
    };
  });

  const formattedResultPromise = await Promise.all(result);

  // Count for pagination
  const total = await prisma.gadget.count({ where });
  const totalPage = Math.ceil(total / limit);

  return {
    result: formattedResultPromise,
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
  };
};

const getOneGadget = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const baseId = searchParams.get("baseId");
  const lang = (searchParams.get("lang") || "en") as Language;

  if (!baseId) {
    throw ApiErrors.BadRequest("Article baseID is missing");
  }

  const gadget = await prisma.gadget.findUnique({
    where: {
      baseId_lang_unique: { baseId, lang },
    },
    include: {
      brand: true,
      type: true,
      author: true,
    },
  });

  if (!gadget) {
    throw ApiErrors.NotFound("Article not found");
  }

  // Fetch localized brand and type concurrently
  const [localizedBrand, localizedType] = await Promise.all([
    prisma.gadgetBrand.findFirst({
      where: { baseId: gadget.brandBaseId, lang },
    }),
    prisma.gadgetType.findFirst({
      where: { baseId: gadget.typeBaseId, lang },
    }),
  ]);

  return {
    ...gadget,
    brand: localizedBrand ?? gadget.brand,
    type: localizedType ?? gadget.type,
  };
};

export const GadgetService = {
  createGadget,
  getAllGadget,
  updateGadget,
  deleteGadget,
  getOneGadget,
};
