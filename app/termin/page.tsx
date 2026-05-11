import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { locations } from "@/lib/content";
import { TerminForm } from "./termin-form";

export const metadata: Metadata = {
  title: "Termin anfragen — Praxis Yann Deleurant",
  description:
    "Erstuntersuchung CHF 150, in 60 Minuten. Anfragen per Formular oder WhatsApp — Luzern, Sursee oder Küssnacht.",
};

export default function TerminPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Link
                href="/"
                className="eyebrow text-navy mb-6 inline-flex items-center gap-3"
              >
                <span className="h-px w-8 bg-navy" />
                Termin
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-light text-ink">
                Ihr Termin.
                <br />
                <span className="italic">Ihr erster Schritt.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-lg text-ink-soft font-light leading-relaxed max-w-xl">
                Erstuntersuchung CHF 150 — 60 Minuten, ohne Druck, ohne
                Verpflichtung. Bei Behandlungsbeginn vollumfänglich
                anrechenbar.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={300}>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-4 text-mute tracking-wide">
                  Dauer
                </span>
                <span className="col-span-8 text-ink-soft">60 Minuten</span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-4 text-mute tracking-wide">
                  Kosten
                </span>
                <span className="col-span-8 text-ink-soft">
                  CHF 150 — anrechenbar
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-4 text-mute tracking-wide">
                  Antwort
                </span>
                <span className="col-span-8 text-ink-soft">
                  innert 24 Stunden (werktags)
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft border-b pb-3 pt-3">
                <span className="col-span-4 text-mute tracking-wide">
                  Überweisung
                </span>
                <span className="col-span-8 text-ink-soft">
                  nicht erforderlich
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHONE STRIP — fastest path, above WhatsApp */}
      <section className="py-12 lg:py-14 bg-bone-deep/40 border-b border-line-soft">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="eyebrow text-navy mb-4">— Telefon</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-2xl lg:text-3xl text-ink font-light leading-snug">
                  Lieber kurz anrufen?
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-sm">
                  Mo – Fr, 08:00 – 17:00. Wir nehmen uns die Zeit, die Sie
                  brauchen.
                </p>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8" delay={200}>
              <a
                href="tel:+41412100455"
                className="group flex items-center justify-between bg-bone border border-line-soft hover:border-navy px-6 lg:px-8 py-5 lg:py-6 transition-colors duration-500"
              >
                <span>
                  <span className="block serif text-2xl lg:text-3xl text-ink font-light">
                    041 210 04 55
                  </span>
                  <span className="block mt-1 text-xs text-mute tracking-wide">
                    Direkt mit dem Empfang
                  </span>
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-mute group-hover:text-navy transition-colors"
                  aria-hidden
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHATSAPP STRIP */}
      <section className="py-16 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="eyebrow text-navy mb-4">— WhatsApp</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-2xl lg:text-3xl text-ink font-light leading-snug">
                  Lieber kurz schreiben?
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-sm">
                  Schreiben Sie uns direkt — wir antworten in der Regel
                  innert weniger Stunden.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {locations.map((l, i) => (
                <Reveal key={l.slug} delay={i * 100}>
                  <a
                    href={`https://wa.me/41412100455?text=${encodeURIComponent(
                      `Grüezi, ich interessiere mich für einen Termin in der Praxis ${l.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between bg-bone border border-line-soft hover:border-navy p-5 transition-colors duration-500"
                  >
                    <span>
                      <span className="block serif text-lg text-ink font-light italic">
                        {l.name}
                      </span>
                      <span className="block mt-1 text-xs text-mute tracking-wide">
                        WhatsApp öffnen
                      </span>
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-mute group-hover:text-navy transition-colors"
                      aria-hidden
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Zm.01 1.67c2.2 0 4.27.86 5.82 2.42a8.21 8.21 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c.01-4.54 3.7-8.24 8.25-8.24Zm-2.96 4.5c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35.99 2.52.12.17 1.7 2.6 4.13 3.55 2.02.78 2.43.63 2.87.59.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.05.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.14.04-.27-.02-.39-.06-.12-.54-1.3-.74-1.78-.18-.4-.36-.4-.5-.4-.13 0-.27 0-.41-.02Z" />
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Anfrage</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink">
                Wir hören
                <br />
                <span className="italic">zuerst zu.</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 text-ink-soft leading-relaxed font-light max-w-sm">
                Ihre Angaben helfen uns, das Erstgespräch vorzubereiten — Sie
                gewinnen Zeit, wir gewinnen Kontext.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={200}>
              <TerminForm />
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}
