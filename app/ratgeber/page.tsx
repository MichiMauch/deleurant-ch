import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ratgeber — Praxis Yann Deleurant",
  description:
    "Was man vor einer kieferorthopädischen Behandlung wissen sollte: Zahnspange, Kieferorthopädie, Invisalign — klar erklärt.",
};

export default function RatgeberPage() {
  return (
    <>
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Ratgeber</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-light text-ink max-w-3xl">
              Was man vorher
              <br />
              <span className="italic">wissen sollte.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-lg text-ink-soft font-light leading-relaxed max-w-xl">
              Drei Themen, drei Antworten. Ohne Verkauf, ohne Umwege — so, wie
              wir es im Erstgespräch erklären würden.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32 lg:pb-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link
                  href={`/ratgeber/${p.slug}`}
                  className="group bg-bone p-10 lg:p-12 h-full flex flex-col"
                >
                  <div className="eyebrow text-navy mb-6">— 0{i + 1}</div>
                  <div className="serif text-3xl text-ink font-light italic leading-snug mb-4">
                    {p.title}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed flex-1">
                    {p.tagline}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-3 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                    <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                    Lesen
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
