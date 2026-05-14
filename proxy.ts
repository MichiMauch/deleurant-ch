import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/locales";

const EDIT_COOKIE = "deleurant-edit";
const LOCALE_HEADER = "x-deleurant-locale";

const PROTECTED_API = [
  "/api/save-content",
  "/api/upload-media",
  "/api/ai-rewrite",
  "/api/add-language",
  "/api/read-content",
];

/**
 * Hat zwei Aufgaben:
 *
 *  1) Locale-Prefix-Routing: `/fr/...` wird intern auf `/...` umgeschrieben und
 *     ein `x-deleurant-locale: fr` Header für die RSC mitgegeben. `/de/...`
 *     wird auf `/...` mit 308 redirected (Default-Locale hat NIE einen Prefix
 *     — so bleibt die Site SEO-clean).
 *
 *  2) Edit-Auth-Gate: `/admin/**` und die schreibenden API-Routen verlangen das
 *     `deleurant-edit` Cookie (Wert = EDIT_PASSWORD-ENV). Login bleibt offen.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ---------- 1) Locale prefix ----------
  // Skip api + admin + Next-Internals — die haben keinen Locale-Prefix.
  if (!pathname.startsWith("/api/") && !pathname.startsWith("/admin")) {
    const m = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(\/.*)?$/);
    if (m) {
      const [, code, rest = "/"] = m;
      if (LOCALE_REGEX.test(code)) {
        if (code === DEFAULT_LOCALE) {
          // /de/foo → /foo (kanonische DE-URL ohne Prefix).
          const url = req.nextUrl.clone();
          url.pathname = rest;
          return NextResponse.redirect(url, 308);
        }
        // /fr/foo → intern rewrite zu /foo, locale per Header an die RSC.
        const url = req.nextUrl.clone();
        url.pathname = rest;
        const reqHeaders = new Headers(req.headers);
        reqHeaders.set(LOCALE_HEADER, code);
        return NextResponse.rewrite(url, { request: { headers: reqHeaders } });
      }
    }
  }

  // ---------- 2) Edit-auth ----------
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

  const cookie = req.cookies.get(EDIT_COOKIE)?.value;
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
  matcher: [
    // Alles ausser Next-Internals, statischen Assets und Cloudinary-Image-Proxy.
    "/((?!_next/|.well-known/|favicon|apple-touch-icon|robots\\.txt|sitemap\\.xml|images/|media/).*)",
  ],
};
