// Enum for user roles
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}

export type IRole = "SUPER_ADMIN" | "ADMIN" | "AUTHOR";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  password: string;
  designation?: string;
  role: Role;
  avatar?: string;
}
