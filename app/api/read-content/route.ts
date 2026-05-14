import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/locales";
import { messagesPath, localeExists } from "@/i18n/locales.server";
import { getByPath } from "@/lib/cms/dot-path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/read-content?path=pages.home.sections.5.data.items&locale=de
 * Returns { value: <value at path> }. Used by list controls to read the
 * latest version before bulk-updating an array, so concurrent field saves
 * don't get clobbered.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  const rawLocale = url.searchParams.get("locale");
  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  const locale = rawLocale && rawLocale.length > 0 ? rawLocale : DEFAULT_LOCALE;
  if (!LOCALE_REGEX.test(locale)) {
    return NextResponse.json({ error: `Invalid locale: ${locale}` }, { status: 400 });
  }
  if (!(await localeExists(locale))) {
    return NextResponse.json({ error: `Locale not found: ${locale}` }, { status: 404 });
  }
  try {
    const raw = await fs.readFile(messagesPath(locale), "utf-8");
    const content = JSON.parse(raw);
    const value = getByPath(content, path);
    return NextResponse.json({ value });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
