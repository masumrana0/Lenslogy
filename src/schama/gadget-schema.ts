import { z } from "zod";

// Custom validation for FileList
const fileListSchema = z.custom<FileList>((val) => {
  return val instanceof FileList;
}, "Invalid file list");

// Date schema that handles both Date objects and date strings
const dateSchema = z.union([
  z.date(),
  z.string().transform((str) => {
    if (!str) return null;
    const date = new Date(str);
    return isNaN(date.getTime()) ? null : date;
  }),
  z.null(),
]);

// Combined schema that works for both modes
export const gadgetSchema = z.object({
  // Content fields
  typeId: z.string().min(1, "Gadget type is required"),
  brandId: z.string().min(1, "Brand is required"),
  brandBaseId: z.string().optional(),
  typeBaseId: z.string().optional(),
  model: z.string().min(1, "Model is required"),
  releaseDate: dateSchema.optional().nullable(),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),

  // Image fields with flexible validation
  image: z.union([fileListSchema, z.string().min(1, "Image is required")]),
  images: z.union([fileListSchema, z.array(z.string())]).optional(),

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
