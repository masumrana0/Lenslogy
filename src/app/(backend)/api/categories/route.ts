import { translateContent } from "@/lib/ai/gemenai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

 

 
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

// export async function PATCH(req: NextRequest) {
//   try {
   

//     return NextResponse.json(
//       {
//         message: "Category upcreatedAtd",
//         en: upcreatedAtdEN,
//         bnUpcreatedAtd: upcreatedAtdBN.count,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating category:", error);
//     return NextResponse.json(
//       { error: "Failed to upcreatedAt category" },
//       { status: 500 }
//     );
//   }
// }
