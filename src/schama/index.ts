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
      if (typeof value === "string") return value.length === 0; // If it's a string, it must be empty
      return value instanceof File; // Otherwise, it must be a File object
    },
    {
      message: "Image is required.",
    }
  ),
  categoryId: z.string({
    required_error: "Please select a category",
  }),
  isFeatured: z.boolean().default(false),
  isPinFeatured: z.boolean().default(false),
  isPinLatest: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
