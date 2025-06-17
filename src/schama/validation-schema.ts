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

 

export const editProfileSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    designation: z.string().optional(),
    oldPassword: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      const anyPasswordFilled =
        data.oldPassword || data.password || data.confirmPassword;
      if (anyPasswordFilled) {
        if (!data.oldPassword || !data.password || !data.confirmPassword)
          return false;
        if (data.password !== data.confirmPassword) return false;
      }
      return true;
    },
    {
      message:
        "To change password, all password fields must be filled and new passwords must match.",
      path: ["confirmPassword"],
    }
  );
