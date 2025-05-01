import type { NextRequest } from "next/server";
import { langMiddleware } from "./middlewares/lang-middleware";

// Define protected routes and their required roles
const protectedRoutes = new Map([
  ["/api/admin", ["admin"]],
  ["/api/user", ["user", "admin"]],
]);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // // For API routes
  if (path.startsWith("/api/")) {
    // return errorHandlerMiddleware(request);
  }

  // For non-protected API routes
  return langMiddleware(request);
}

export const config = {
  matcher: [
    // API routes
    "/api/:path*",
    // All pages except public files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
