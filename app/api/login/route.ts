import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "deleurant-edit";

/** Build a redirect URL that respects the proxy's forwarded host/proto. */
function publicUrl(req: Request, path: string): URL {
  const headers = req.headers;
  const host =
    headers.get("x-forwarded-host") ?? headers.get("host") ?? new URL(req.url).host;
  const proto = headers.get("x-forwarded-proto") ?? "http";
  return new URL(path, `${proto}://${host}`);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const rawFrom = String(form.get("from") ?? "/admin/seo");
  // Only allow relative redirects to prevent open-redirect.
  const from = rawFrom.startsWith("/") ? rawFrom : "/admin/seo";

  const expected = process.env.EDIT_PASSWORD;
  if (!expected) {
    return NextResponse.redirect(publicUrl(req, "/admin/login?error=server"), 303);
  }
  if (password !== expected) {
    return NextResponse.redirect(
      publicUrl(req, `/admin/login?error=wrong&from=${encodeURIComponent(from)}`),
      303,
    );
  }

  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const jar = await cookies();
  jar.set(COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: proto === "https",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.redirect(publicUrl(req, from), 303);
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
