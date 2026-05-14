import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LOCALE_REGEX } from "@/i18n/locales";
import { localeExists } from "@/i18n/locales.server";

const COOKIE_NAME = "deleurant-locale";

function publicUrl(req: Request, path: string): URL {
  const headers = req.headers;
  const host =
    headers.get("x-forwarded-host") ?? headers.get("host") ?? new URL(req.url).host;
  const proto = headers.get("x-forwarded-proto") ?? "http";
  return new URL(path, `${proto}://${host}`);
}

/**
 * GET /api/locale?set=<code>&back=<path>
 * Sets the deleurant-locale cookie if the messages/<code>.json file exists,
 * then redirects back to `back` (must be a relative path).
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const candidate = url.searchParams.get("set") ?? "";
  const rawBack = url.searchParams.get("back") ?? "/";
  const back = rawBack.startsWith("/") ? rawBack : "/";

  if (!LOCALE_REGEX.test(candidate)) {
    return NextResponse.redirect(publicUrl(req, back), 303);
  }
  if (!(await localeExists(candidate))) {
    return NextResponse.redirect(publicUrl(req, back), 303);
  }

  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const jar = await cookies();
  jar.set(COOKIE_NAME, candidate, {
    httpOnly: false,
    sameSite: "lax",
    secure: proto === "https",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.redirect(publicUrl(req, back), 303);
}
