"use client";

import { Globe, ImageOff } from "lucide-react";

type Props = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  url?: string;
};

export function SeoPreview({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  url = "https://deleurant.ch",
}: Props) {
  const host = safeHost(url);
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-mute mb-3">
          Google-Vorschau
        </h3>
        <GoogleSerp title={title} description={description} url={url} host={host} />
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-mute mb-3">
          Social-Media-Vorschau
        </h3>
        <OgCard title={ogTitle} description={ogDescription} image={ogImage} host={host} />
      </div>
    </div>
  );
}

function GoogleSerp({
  title,
  description,
  url,
  host,
}: {
  title: string;
  description: string;
  url: string;
  host: string;
}) {
  const t = truncate(title || "Titel der Seite", 60);
  const d = truncate(description || "Hier erscheint deine Meta-Description.", 160);
  return (
    <div className="rounded-xl border border-line bg-bone p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-ink-soft">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bone-deep/60">
          <Globe className="h-3.5 w-3.5 text-mute" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-ink font-medium">{host}</span>
          <span className="text-mute">{url}</span>
        </div>
      </div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="mt-2 block text-xl text-[#1a0dab] hover:underline visited:text-[#681da8] font-normal"
      >
        {t}
      </a>
      <p className="mt-1 text-sm text-ink-soft leading-snug">{d}</p>
    </div>
  );
}

function OgCard({
  title,
  description,
  image,
  host,
}: {
  title: string;
  description: string;
  image: string;
  host: string;
}) {
  const t = truncate(title || "OG Titel der Seite", 70);
  const d = truncate(description || "Beschreibung, wie sie auf Facebook oder LinkedIn erscheint.", 200);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bone shadow-sm">
      <div className="relative aspect-[1.91/1] w-full bg-bone-deep/60">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="OG Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-mute">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs">Kein OG-Image gesetzt — empfohlen 1200×630 px</span>
          </div>
        )}
      </div>
      <div className="space-y-1 border-t border-line bg-bone-deep/30 p-4">
        <p className="text-[11px] uppercase tracking-wider text-mute">{host}</p>
        <p className="text-sm font-semibold text-ink leading-snug">{t}</p>
        <p className="text-xs text-ink-soft leading-snug line-clamp-2">{d}</p>
      </div>
    </div>
  );
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

function safeHost(u: string): string {
  try {
    return new URL(u).host;
  } catch {
    return u;
  }
}
