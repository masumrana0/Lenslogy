import { type NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has appropriate role
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only super-admin can create admins, and only super-admin/admin can create authors
    const userRole = session.user.role;

    const { password, ...payload } = await req.json();

    // ValicreatedAt role permissions
    if (
      (payload.role === "SUPER_ADMIN" && userRole !== "SUPER_ADMIN") ||
      (payload.role === "ADMIN" && userRole !== "SUPER_ADMIN") ||
      (payload.role === "AUTHOR" &&
        userRole !== "SUPER_ADMIN" &&
        userRole !== "ADMIN")
    ) {
      return NextResponse.json(
        { error: "You don't have permission to create this user role" },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    const readyData: IUser = { ...payload, password: hashedPassword };

    // Create user
    const user = await prisma.user.create({
      data: readyData,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
