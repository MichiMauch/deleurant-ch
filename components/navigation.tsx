"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Behandlungen", href: "#behandlungen" },
  { label: "Standorte", href: "#standorte" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-xl border-b border-line-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="block transition-opacity hover:opacity-80"
            aria-label="Praxis Yann Deleurant — Startseite"
          >
            <Image
              src="/images/logo.png"
              alt="Praxis Yann Deleurant"
              width={504}
              height={129}
              priority
              className={`h-9 lg:h-10 w-auto transition-[filter] duration-500 ${
                scrolled ? "[filter:invert(1)_brightness(0.15)]" : ""
              }`}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-[13px] tracking-wide transition-colors py-2 ${
                  scrolled
                    ? "text-ink-soft hover:text-ink"
                    : "text-bone/90 hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-px mx-auto h-px w-0 transition-all duration-500 group-hover:w-full ${
                    scrolled ? "bg-navy" : "bg-bone"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-8 lg:gap-10">
            <a
              href="tel:+41412100455"
              className={`hidden lg:inline-flex items-center gap-3 text-sm tracking-wide font-light transition-colors group ${
                scrolled
                  ? "text-ink hover:text-navy"
                  : "text-bone hover:text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
              }`}
            >
              <span
                className={`h-px w-8 transition-all duration-500 group-hover:w-12 ${
                  scrolled ? "bg-navy" : "bg-bone/70"
                }`}
              />
              041 210 04 55
            </a>
            <Link
              href="#termin"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] tracking-wide bg-navy text-bone px-5 py-3 hover:bg-navy-soft transition-colors duration-500"
            >
              Termin anfragen
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 5h8m-3-3 3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
            <button
              type="button"
              aria-label="Menü"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 -mr-2"
            >
              <span className={`block h-px w-6 mb-1.5 ${scrolled ? "bg-ink" : "bg-bone"}`} />
              <span className={`block h-px w-6 mb-1.5 ${scrolled ? "bg-ink" : "bg-bone"}`} />
              <span className={`block h-px w-4 ml-auto ${scrolled ? "bg-ink" : "bg-bone"}`} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bone border-t border-line-soft">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="serif text-2xl text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+41412100455" className="text-sm text-ink-soft mt-2">
              041 210 04 55
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
