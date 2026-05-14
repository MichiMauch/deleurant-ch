import { cookies } from "next/headers";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { localeExists } from "@/i18n/locales.server";

/**
 * Resolves the locale for the current request from the `deleurant-locale`
 * cookie. Falls back to DEFAULT_LOCALE if no cookie, an unknown code, or a
 * locale whose JSON file does not exist.
 */
export async function getRequestLocale(): Promise<string> {
  const jar = await cookies();
  const candidate = jar.get("deleurant-locale")?.value;
  if (candidate && candidate !== DEFAULT_LOCALE && (await localeExists(candidate))) {
    return candidate;
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
  return jar.get("deleurant-edit")?.value === expected;
}
