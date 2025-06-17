import { z } from "zod";

// Create schema for article creation
export const articleCreateSchema = z
  .object({
    title: z
      .string()
      .min(5, {
        message: "Title must be at least 5 characters",
      })
      .max(150, {
        message: "Title must be max 150 characters",
      }),
    excerpt: z
      .string()
      .min(10, {
        message: "Excerpt must be at least 10 characters",
      })
      .max(250, {
        message: "Excerpt must be max 250 characters",
      }),
    content: z.string().min(50, {
      message: "Content must be at least 50 characters",
    }),
    image: z.union([z.instanceof(File), z.string()]).refine(
      (value) => {
        if (value instanceof File) return true;
        return false; // For create, we need a file
      },
      {
        message: "Featured image is required",
      }
    ),
    categoryBaseId: z.string().min(1, {
      message: "Please select a category",
    }),
    categoryId: z.string().min(1, {
      message: "Category ID is required",
    }),

    // Boolean flags
    isPublished: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    isPinFeatured: z.boolean().default(false),
    isPinLatest: z.boolean().default(false),
    isLatest: z.boolean().default(false),
    isPinHero: z.boolean().default(false),
    isUpComing: z.boolean().default(false),
    isEmergingTech: z.boolean().default(false),
    isHotTech: z.boolean().default(false),
    isGadget: z.boolean().default(false),
    isPinNav: z.boolean().default(false),
  })
  .refine(
    (data) => {
      const pinOptions = [data.isPinFeatured, data.isPinLatest, data.isPinHero];
      const pinCount = pinOptions.filter(Boolean).length;
      return pinCount <= 1;
    },
    {
      message: "You can only select one of: Pin to Featured, Latest, or Hero.",
      path: ["isPinFeatured"],
    }
  );

// Create schema for article editing (more lenient image validation)
export const articleEditSchema = z
  .object({
    title: z
      .string()
      .min(5, {
        message: "Title must be at least 5 characters",
      })
      .max(150, {
        message: "Title must be max 150 characters",
      }),
    excerpt: z
      .string()
      .min(10, {
        message: "Excerpt must be at least 10 characters",
      })
      .max(250, {
        message: "Excerpt must be max 250 characters",
      }),
    content: z.string().min(50, {
      message: "Content must be at least 50 characters",
    }),
    image: z
      .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
      .optional(),
    categoryBaseId: z.string().min(1, {
      message: "Please select a category",
    }),
    categoryId: z.string().min(1, {
      message: "Category ID is required",
    }),

    // Boolean flags
    isPublished: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    isPinFeatured: z.boolean().default(false),
    isPinLatest: z.boolean().default(false),
    isLatest: z.boolean().default(false),
    isPinHero: z.boolean().default(false),
    isUpComing: z.boolean().default(false),
    isEmergingTech: z.boolean().default(false),
    isHotTech: z.boolean().default(false),
    isGadget: z.boolean().default(false),
    isPinNav: z.boolean().default(false),
  })
  .refine(
    (data) => {
      const pinOptions = [data.isPinFeatured, data.isPinLatest, data.isPinHero];
      const pinCount = pinOptions.filter(Boolean).length;
      return pinCount <= 1;
    },
    {
      message: "You can only select one of: Pin to Featured, Latest, or Hero.",
      path: ["isPinFeatured"],
    }
  );

// Export the appropriate schema based on mode
export const articleSchema = articleCreateSchema;
