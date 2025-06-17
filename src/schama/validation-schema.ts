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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
});

 