import { z } from "zod";

// Custom validation for FileList
const fileListSchema = z.custom<FileList>((val) => {
  return val instanceof FileList;
}, "Invalid file list");

const requiredFileListSchema = fileListSchema.refine(
  (files) => files && files.length > 0,
  "At least one file is required"
);

export const gadgetSchema = z.object({
  // Content fields
  typeId: z.string().min(1, "Gadget type is required"),
  brandId: z.string().min(1, "Brand is required"),
  brandBaseId: z.string().optional(),
  typeBaseId: z.string().optional(),
  model: z.string().min(1, "Model is required"),
  releaseDate: z.date().optional().nullable(),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),

  // Image fields with validation
  image: requiredFileListSchema,
  images: requiredFileListSchema,

  // Settings fields
  isGadget: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPinFeatured: z.boolean().default(false),
  isPinLatest: z.boolean().default(false),
  isLatest: z.boolean().default(false),
  isPinHero: z.boolean().default(false),
  isPinNav: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isUpComing: z.boolean().default(false),
  isEmergingTech: z.boolean().default(false),
  isHotTech: z.boolean().default(false),
});

export type GadgetFormData = z.infer<typeof gadgetSchema>;
