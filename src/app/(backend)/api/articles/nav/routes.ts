import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(req: NextRequest) {
  // try {

  console.log("hello wrold ");
  throw new ApiError(500, "something is wrong");
  const { searchParams } = new URL(req.url);
  const langParam = searchParams.get("lang") as Language | undefined;

  const where = {
    isPublished: true,
    isEmergingTech: true,
    ...(langParam && { lang: langParam }),
  };

  const [aiAndMachineLearning, emergingTech, upcomingGadgets, latestGadgets] =
    await Promise.all([
      prisma.article.findMany({
        where: { ...where, category: { name: "AI" } },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.article.findMany({
        where: { ...where },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.article.findMany({
        where: { ...where, isUpComing: true, isGadget: true },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.article.findMany({
        where: { ...where, isGadget: true },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
    ]);

  return NextResponse.json(
    {
      data: {
        aiAndMachineLearning,
        emergingTech,
        upcomingGadgets,
        latestGadgets,
      },
    },
    { status: 200 }
  );
  // } catch (error) {
  //   console.error("GET /api/nav-articles error:", error);
  //   return NextResponse.json(
  //     { error:  er },
  //     { status: 500 }
  //   );
  // }
}
