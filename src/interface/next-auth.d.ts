// types/next-auth.d.ts (or any .d.ts file)
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "SUPER_ADMIN" | "ADMIN" | "AUTHOR";
      designation?: string | null;
      avatar?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "SUPER_ADMIN" | "ADMIN" | "AUTHOR";
    designation?: string | null;
    avatar?: string | null;
  }
}
