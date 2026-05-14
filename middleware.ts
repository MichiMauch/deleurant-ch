import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "deleurant-edit";

/** API routes that require the editor cookie. */
const PROTECTED_API = [
  "/api/save-content",
  "/api/upload-media",
  "/api/ai-rewrite",
  "/api/add-language",
  "/api/read-content",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login routes are always open.
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isApi = PROTECTED_API.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!isAdmin && !isApi) return NextResponse.next();

  const expected = process.env.EDIT_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "EDIT_PASSWORD nicht konfiguriert (Server-ENV fehlt)" },
      { status: 500 },
    );
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie === expected) return NextResponse.next();

  if (isApi) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Only run middleware where it can match a protected route.
  matcher: ["/admin/:path*", "/api/:path*"],
};
