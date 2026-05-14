import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/locales";
import { messagesPath, localeExists } from "@/i18n/locales.server";
import { setByPath, getByPath } from "@/lib/cms/dot-path";
import {
  propagateChange,
  propagateSections,
  type PropagationResult,
} from "@/lib/cms/propagate";

export const maxDuration = 90;

function isValidValue(v: unknown): boolean {
  if (v === null) return true;
  const t = typeof v;
  if (t === "string" || t === "number" || t === "boolean") return true;
  if (Array.isArray(v)) return true;
  if (t === "object") return true;
  return false;
}

const SECTIONS_PATH_RE = /(?:^|\.)sections$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    typeof (body as { path?: unknown }).path !== "string" ||
    !("value" in (body as object)) ||
    !isValidValue((body as { value: unknown }).value)
  ) {
    return NextResponse.json(
      { error: "Expected { path: string, value: any, locale?: string, propagate?: boolean }" },
      { status: 400 },
    );
  }

  const {
    path: dotPath,
    value,
    locale: rawLocale,
    propagate: rawPropagate,
  } = body as {
    path: string;
    value: unknown;
    locale?: unknown;
    propagate?: unknown;
  };

  const locale =
    typeof rawLocale === "string" && rawLocale.length > 0 ? rawLocale : DEFAULT_LOCALE;
  if (!LOCALE_REGEX.test(locale)) {
    return NextResponse.json({ error: `Invalid locale: ${locale}` }, { status: 400 });
  }
  if (!(await localeExists(locale))) {
    return NextResponse.json({ error: `Locale not found: ${locale}` }, { status: 404 });
  }

  const propagateEnabled = rawPropagate !== false && locale === DEFAULT_LOCALE;

  let propagation: PropagationResult | null = null;
  try {
    const filePath = messagesPath(locale);
    const raw = await fs.readFile(filePath, "utf-8");
    const content = JSON.parse(raw);
    const previous = getByPath(content, dotPath);

    setByPath(content, dotPath, value);
    await fs.writeFile(filePath, JSON.stringify(content, null, 2) + "\n", "utf-8");

    const changed = JSON.stringify(previous) !== JSON.stringify(value);
    if (propagateEnabled && changed) {
      try {
        if (SECTIONS_PATH_RE.test(dotPath) && Array.isArray(value)) {
          propagation = await propagateSections(
            dotPath,
            value as Array<{ id: string; type: string; data: unknown }>,
            locale,
          );
        } else if (typeof value === "string") {
          propagation = await propagateChange(dotPath, value, locale);
        }
      } catch (err) {
        propagation = {
          translated: [],
          copied: [],
          skipped: [],
          errors: [
            {
              locale: "*",
              error: err instanceof Error ? err.message : "Propagation failed",
            },
          ],
        };
      }
    }

    return NextResponse.json({ ok: true, locale, propagation });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
