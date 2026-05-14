import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/locales";

const NON_PATH = /^(https?:\/\/|mailto:|tel:|#|data:)/i;

/**
 * Prepends `/<locale>` to a path if the locale isn't the default. Leaves
 * external/anchor/mailto/tel hrefs untouched.
 */
export function withLocale(path: string, locale: string): string {
  if (!path) return path;
  if (NON_PATH.test(path)) return path;
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/")) return `/${locale}${path}`;
  return path;
}

/**
 * If the path starts with a known locale prefix, return [locale, rest].
 * Otherwise return [null, path].
 */
export function splitLocale(path: string, knownLocales: string[]): [string | null, string] {
  const m = path.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(\/.*)?$/);
  if (!m) return [null, path];
  const [, locale, rest = "/"] = m;
  if (!LOCALE_REGEX.test(locale)) return [null, path];
  if (!knownLocales.includes(locale)) return [null, path];
  if (locale === DEFAULT_LOCALE) return [null, path]; // default never has a prefix
  return [locale, rest];
}

/** Build the equivalent path in `target` locale, given a path that may carry a prefix. */
export function changeLocale(
  currentPath: string,
  target: string,
  knownLocales: string[],
): string {
  const [, rest] = splitLocale(currentPath, knownLocales);
  return withLocale(rest, target);
}
