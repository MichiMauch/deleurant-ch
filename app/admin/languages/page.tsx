import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Languages } from "lucide-react";
import { listLocales } from "@/i18n/locales.server";
import { LanguagesAdmin } from "@/components/cms/LanguagesAdmin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sprachen",
  robots: { index: false, follow: false },
};

export default async function LanguagesAdminPage() {
  const locales = await listLocales();
  const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY);
  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-bone">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-bone">
              <Languages className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-ink">Sprachen verwalten</h1>
              <p className="text-xs text-mute">
                Übersetzt deine Inhalte automatisch über OpenAI in eine neue Sprache.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bone px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-navy transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück zur Seite
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <LanguagesAdmin initialLocales={locales} hasOpenAiKey={hasOpenAiKey} />
      </div>
    </main>
  );
}
