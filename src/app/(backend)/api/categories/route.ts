import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to create categories" },
        { status: 403 }
      );
    }

    const { name } = await req.json();

    // Step 1: Translate name to Bangla
    const translated = await translateContent({ name: name });

    // // Step 2: Create English category
    const englishCategory = await prisma.category.create({
      data: {
        name,
        lang: "en",
      },
    });

    // // Step 3: Create Bangla category linked to the English one
    const banglaCategory = await prisma.category.create({
      data: {
        name: translated.name,
        lang: "bn",
        baseId: englishCategory.baseId,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        en: englishCategory,
        bn: banglaCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";

    const categories = await prisma.category.findMany({
      where: {
        lang: lang === "bn" ? "bn" : "en",
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to delete categories" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("baseId");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Delete both EN and BN versions (by id and baseId match)
    const deleted = await prisma.category.deleteMany({
      where: {
        baseId: id,
      },
    });

    return NextResponse.json({
      message: "Category deleted",
      count: deleted.count,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to update categories" },
        { status: 403 }
      );
    }

    const { id, name } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 }
      );
    }

    // Update the English version
    const updatedEN = await prisma.category.update({
      where: { id },
      data: { name },
    });

    // Translate new name
    const translated = await translateContent({ name });

    // Update the Bangla version using baseId
    const updatedBN = await prisma.category.updateMany({
      where: {
        baseId: updatedEN.baseId,
        lang: "bn",
      },
      data: {
        name: translated.name,
      },
    });

    return NextResponse.json(
      {
        message: "Category updated",
        en: updatedEN,
        bnUpdated: updatedBN.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
