// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function langMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public files and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Already has locale
  if (pathname.startsWith("/en") || pathname.startsWith("/bn")) {
    return;
  }

  // Detect from cookie or browser
  const cookieLang = req.cookies.get("i18next")?.value;
  const browserLang = req.headers
    .get("accept-language")
    ?.split(",")[0]
    .split("-")[0];

  const preferredLang = cookieLang || browserLang || "en";

  return NextResponse.redirect(
    new URL(`/${preferredLang}${pathname}`, req.url)
  );
}
