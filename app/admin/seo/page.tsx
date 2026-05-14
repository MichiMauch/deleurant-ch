import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { readContent } from "@/lib/cms/content";
import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/locales";
import { listLocales, localeExists } from "@/i18n/locales.server";
import { SeoForm } from "@/components/cms/SeoForm";
import { SeoLocaleSwitcher } from "@/components/cms/SeoLocaleSwitcher";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SEO-Dashboard",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ locale?: string }>;

export default async function SeoAdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requested = params.locale;
  const locale =
    requested && LOCALE_REGEX.test(requested) && (await localeExists(requested))
      ? requested
      : DEFAULT_LOCALE;
  const locales = await listLocales();
  const content = await readContent(locale);

  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-bone">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-bone">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-ink">SEO-Dashboard</h1>
              <p className="text-xs text-mute">Meta-Tags & Social-Media-Vorschau (global)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SeoLocaleSwitcher current={locale} locales={locales} />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bone px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-navy transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Zurück zur Seite
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <SeoForm key={locale} initial={content.seo} locale={locale} />
      </div>
    </main>
  );
}
