import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { ApiErrors } from "../errors/api-error";

const protectedRoutes = new Map([
  ["/api/admin", ["admin"]],
  ["/api/user", ["user", "admin"]],
]);

export async function authMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the route needs authentication
  const requiredRoles = protectedRoutes.get(path);
  if (!requiredRoles) {
    return NextResponse.next();
  }

  try {
    // Get the session using NextAuth
    const session = await getServerSession(authOptions);

    // If no session exists, throw authentication error
    if (!session) {
      ApiErrors.Unauthorized();
    }

    // Check if user has the required role
    if (
      !session ||
      !session.user?.role ||
      !requiredRoles.includes(session.user.role)
    ) {
      ApiErrors.Forbidden();
    }

    // Add user info to request headers
    const headers = new Headers(request.headers);
    headers.set("x-user-id", session?.user?.id || "");
    headers.set("x-user-role", session?.user?.role || "");

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (error) {
    // Pass the error to the global error handler
    return NextResponse.error();
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/api/:path*"],
};
