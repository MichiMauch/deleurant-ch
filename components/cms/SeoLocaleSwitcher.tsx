"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeFlag, localeName } from "@/i18n/locales";

export function SeoLocaleSwitcher({
  current,
  locales,
  basePath,
}: {
  current: string;
  locales: string[];
  basePath?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const target = basePath ?? pathname;
  return (
    <label className="inline-flex items-center gap-2 text-xs text-mute">
      <span>Sprache:</span>
      <select
        value={current}
        onChange={(e) => router.push(`${target}?locale=${e.target.value}`)}
        className="rounded-md border border-line bg-bone px-2 py-1 text-xs font-medium text-ink focus:outline-none focus:ring-2 focus:ring-navy/30"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeFlag(code)} {localeName(code, current)} ({code})
          </option>
        ))}
      </select>
    </label>
  );
}
