import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { localeExists } from "@/i18n/locales.server";

const LOCALE_HEADER = "x-deleurant-locale";
const EDIT_COOKIE = "deleurant-edit";

/**
 * Resolves the locale for the current request from the URL prefix detected by
 * the proxy middleware. The proxy rewrites `/fr/...` to `/...` and sets the
 * `x-deleurant-locale` request header. Without that header we're on a default-
 * locale URL.
 *
 * Falls back to DEFAULT_LOCALE if the header references a locale whose JSON
 * file has been removed.
 */
export async function getRequestLocale(): Promise<string> {
  const h = await headers();
  const fromHeader = h.get(LOCALE_HEADER);
  if (
    fromHeader &&
    fromHeader !== DEFAULT_LOCALE &&
    (await localeExists(fromHeader))
  ) {
    return fromHeader;
  }
  return DEFAULT_LOCALE;
}

/**
 * Server-side editor check. Returns true if the request carries a valid
 * `deleurant-edit` cookie matching EDIT_PASSWORD. Used by the root layout
 * to gate the EditModeProvider so anonymous visitors never see edit chrome.
 */
export async function isEditor(): Promise<boolean> {
  const expected = process.env.EDIT_PASSWORD;
  if (!expected) return false;
  const jar = await cookies();
  return jar.get(EDIT_COOKIE)?.value === expected;
}
