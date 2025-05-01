import z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "AUTHOR"]),
  designation: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const categorySchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 2 characters",
  }),
});

export const articleSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters",
  }),
  image: z.union([z.instanceof(File), z.string().length(0)]).refine(
    (value) => {
      if (typeof value === "string") return value.length === 0;
      return value instanceof File;
    },
    {
      message: "Image is required.",
    }
  ),
  categoryId: z.string({
    required_error: "Please select a category",
  }),

  // ✅ Main boolean flags
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isPinFeatured: z.boolean().default(false),
  isPinLatest: z.boolean().default(false),

  // ✅ Additional boolean flags (added from your Settings tab)
  isPinHero: z.boolean().default(false),
  isUpComing: z.boolean().default(false),
  isEmergingTech: z.boolean().default(false),
  isHotTech: z.boolean().default(false),
  isGadget: z.boolean().default(false),
});
