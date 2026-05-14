import { cookies } from "next/headers";
import { DEFAULT_LOCALE } from "@/i18n/locales";

// Single source of truth for the current request's locale.
// Today: hardcoded to default (only German is active). When a
// second locale is enabled, swap to cookie/header/pathname-based
// resolution here — every page already calls this helper.
export async function getRequestLocale(): Promise<string> {
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
