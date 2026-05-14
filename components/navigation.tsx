"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/cms/LocaleSwitcher";

const nav = [
  { label: "Behandlungen", href: "/#wunsch" },
  { label: "Standorte", href: "/#standorte" },
  { label: "Team", href: "/team" },
  { label: "Ratgeber", href: "/ratgeber" },
];

type NavigationProps = {
  locale: string;
  locales: string[];
};

// Routes whose top-of-page hero is dark (image/video). Everywhere else has a
// light bone hero, so the nav must render in ink colors from the start.
function heroIsDark(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/") return true;
  if (pathname.startsWith("/behandlungen/")) return true;
  if (pathname.startsWith("/standorte/")) return true;
  if (pathname.startsWith("/arbeitgeber")) return true;
  return false;
}

export function Navigation({ locale, locales }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !scrolled && heroIsDark(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-xl border-b border-line-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-10">
          <Link
            href="/"
            className="block transition-opacity hover:opacity-80 shrink-0"
            aria-label="Praxis Yann Deleurant — Startseite"
          >
            <Image
              src="/images/logo.png"
              alt="Praxis Yann Deleurant"
              width={504}
              height={129}
              priority
              className={`h-9 lg:h-10 w-auto transition-[filter] duration-500 ${
                onDark ? "" : "[filter:invert(1)_brightness(0.15)]"
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-9">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[13px] tracking-wide transition-colors py-2 ${
                    onDark
                      ? "text-bone/90 hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-px h-px w-0 transition-all duration-500 group-hover:w-full ${
                      onDark ? "bg-bone" : "bg-navy"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <span
              aria-hidden
              className={`h-4 w-px ${onDark ? "bg-bone/30" : "bg-line"}`}
            />

            <LocaleSwitcher current={locale} locales={locales} onDark={onDark} />

            {locales.length > 1 && (
              <span
                aria-hidden
                className={`h-4 w-px ${onDark ? "bg-bone/30" : "bg-line"}`}
              />
            )}

            <Link
              href="/termin"
              className={`group inline-flex items-center gap-2.5 text-[13px] tracking-wide transition-colors shrink-0 ${
                onDark
                  ? "text-bone hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
                  : "text-navy hover:text-ink"
              }`}
            >
              Termin
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-0.5"
              >
                <path
                  d="M2 10h16m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2"
          >
            <span
              className={`block h-px w-6 mb-1.5 ${
                onDark ? "bg-bone" : "bg-ink"
              }`}
            />
            <span
              className={`block h-px w-6 mb-1.5 ${
                onDark ? "bg-bone" : "bg-ink"
              }`}
            />
            <span
              className={`block h-px w-4 ml-auto ${
                onDark ? "bg-bone" : "bg-ink"
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bone border-t border-line-soft">
          <nav className="flex flex-col px-6 py-8 gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="serif text-2xl text-ink font-light italic"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/termin"
              onClick={() => setOpen(false)}
              className="serif text-2xl text-navy font-light italic mt-2"
            >
              Termin
            </Link>
            <a
              href="tel:+41412100455"
              className="text-sm text-ink-soft tracking-wide mt-4"
            >
              041 210 04 55
            </a>
            {locales.length > 1 && (
              <div className="mt-6 pt-6 border-t border-line-soft">
                <LocaleSwitcher current={locale} locales={locales} compact />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
