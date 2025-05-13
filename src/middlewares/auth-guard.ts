import { GlobalErrorHandler } from "@/app/(backend)/_core/error-handler/global-error-handler/global-error-handler";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
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
    // ✅ Attach user info to headers
    // const headers = new Headers(request.headers);
    // headers.set("x-user-id", session.user.id);
    // headers.set("x-user-role", userRole);
    // return NextResponse.next({
    //   request: { headers },
    // });
  } catch (error) {
    return GlobalErrorHandler(error);
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
