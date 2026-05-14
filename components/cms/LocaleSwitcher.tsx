"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { changeLocale } from "@/lib/cms/locale-path";

type Props = {
  current: string;
  locales: string[];
  onDark?: boolean;
  /** Use a more compact dot-separator variant (mobile menu). */
  compact?: boolean;
};

export function LocaleSwitcher({ current, locales, onDark = false, compact = false }: Props) {
  const pathname = usePathname() ?? "/";
  if (locales.length < 2) return null;

  const baseInactive = onDark
    ? "text-bone/85 hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
    : "text-ink-soft hover:text-ink";
  const baseActive = onDark
    ? "text-bone font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
    : "text-ink font-medium";
  const sep = onDark ? "text-bone/40" : "text-line";

  return (
    <div
      className={`flex items-center ${compact ? "gap-3 text-sm" : "gap-2 text-[13px]"} tracking-wide uppercase`}
      aria-label="Sprache wählen"
    >
      {locales.map((code, i) => {
        const isActive = code === current;
        if (isActive) {
          return (
            <span key={code} className={baseActive}>
              {code}
            </span>
          );
        }
        const href = changeLocale(pathname, code, locales);
        return (
          <span key={code} className="inline-flex items-center gap-2">
            {i > 0 && !compact && <span className={sep} aria-hidden>·</span>}
            <Link
              href={href}
              prefetch={false}
              className={`cursor-pointer transition-colors ${baseInactive}`}
            >
              {code}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
