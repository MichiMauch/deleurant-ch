import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bone-deep/40">
      <nav className="border-b border-line bg-bone">
        <div className="mx-auto max-w-6xl flex items-center gap-6 px-6 py-3 text-sm">
          <Link href="/" className="font-semibold text-ink">
            ← deleurant.ch
          </Link>
          <span className="text-line">·</span>
          <Link href="/admin/seo" className="text-ink-soft hover:text-navy transition-colors">
            SEO
          </Link>
          <Link href="/admin/languages" className="text-ink-soft hover:text-navy transition-colors">
            Sprachen
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
