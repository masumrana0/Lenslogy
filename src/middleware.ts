import { NextResponse, type NextRequest } from "next/server";
import { langMiddleware } from "./middlewares/lang-middleware";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { ApiErrors } from "./app/(backend)/_core/errors/api-error";

enum Role {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  AUTHOR = "AUTHOR",
}

const protectedRoutes: Record<
  string,
  Partial<Record<"GET" | "POST" | "PUT" | "DELETE" | "PATCH", string[]>>
> = {
  "/api/articles": {
    POST: [Role.ADMIN, Role.SUPER_ADMIN],
    DELETE: [Role.SUPER_ADMIN, Role.ADMIN, Role.AUTHOR],
  },
  "/api/user": {
    GET: [Role.ADMIN, Role.SUPER_ADMIN],
    POST: [Role.SUPER_ADMIN, Role.ADMIN],
    DELETE: [Role.SUPER_ADMIN],
  },
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // // For API routes
  if (path.startsWith("/api/")) {
    const { pathname } = request.nextUrl;
    const method = request.method as keyof (typeof protectedRoutes)[string];

    const allowedRoles = protectedRoutes[pathname]?.[method];

    if (!allowedRoles) {
      return NextResponse.next();
    }

    // const session = await getServerSession(authOptions);
    // if (!session || !session.user?.role) {
    //   throw ApiErrors.Unauthorized();
    // }

    // const userRole = session.user.role;
    // if (!allowedRoles.includes(userRole)) {
    //   throw ApiErrors.Forbidden(
    //     `Role ${userRole} is not allowed to access ${method} ${pathname}`
    //   );
    // }
  }

  return langMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
