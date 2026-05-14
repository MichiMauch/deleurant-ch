"use client";

import { usePathname } from "next/navigation";

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
    ? "text-bone/60 hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
    : "text-mute hover:text-ink";
  const baseActive = onDark
    ? "text-bone font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
    : "text-ink font-medium";
  const sep = onDark ? "text-bone/30" : "text-line";

  return (
    <div
      className={`flex items-center ${compact ? "gap-3 text-sm" : "gap-2 text-[12px]"} tracking-wide uppercase`}
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
        const href = `/api/locale?set=${encodeURIComponent(code)}&back=${encodeURIComponent(pathname)}`;
        return (
          <span key={code} className="inline-flex items-center gap-2">
            {i > 0 && !compact && <span className={sep} aria-hidden>·</span>}
            <a href={href} className={`transition-colors ${baseInactive}`}>
              {code}
            </a>
          </span>
        );
      })}
    </div>
  );
}
