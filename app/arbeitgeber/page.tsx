import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { benefits, jobs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Arbeiten bei Team Deleurant — offene Stellen",
  description:
    "Drei Standorte in der Zentralschweiz, ein Team, klare Hierarchie. Kultur, Benefits und offene Stellen.",
};

export default function ArbeitgeberPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/team.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/40" />

        <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <Reveal>
            <div className="eyebrow text-bone/80 mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-bone/60" />
              Arbeitgeber
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-bone text-[clamp(2.75rem,6vw,5.5rem)] leading-[1] font-light [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] max-w-3xl">
              Arbeiten bei
              <br />
              <span className="italic">Team Deleurant.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-bone/90 text-lg max-w-xl font-light leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              Drei Praxen, ein Team. Wir wachsen — und suchen Menschen, die
              das mit uns tragen wollen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <Reveal>
            <p className="serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-light text-ink italic">
              Wir bauen eine Praxis, in der gute Arbeit möglich ist. Nicht
              einmalig, sondern als System. Wer das mitträgt, ist bei uns
              richtig.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Kultur & Benefits</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink">
                Was Sie bei uns
                <br />
                <span className="italic">erwartet.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="bg-bone p-8 lg:p-10 h-full">
                  <div className="serif text-mute text-sm font-light mb-6">
                    0{i + 1}
                  </div>
                  <div className="serif text-xl text-ink font-light italic leading-snug mb-4">
                    {b.title}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFENE STELLEN */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow text-navy mb-6">— Offene Stellen</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink">
                  Wir suchen
                  <br />
                  <span className="italic">{jobs.length} Mitwirkende.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={200}>
                <p className="text-ink-soft text-lg leading-relaxed font-light">
                  Nicht das Richtige dabei? Initiativ-Bewerbungen sind
                  willkommen — schreiben Sie direkt an Yann.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="space-y-px bg-line-soft border border-line-soft">
            {jobs.map((j, i) => (
              <Reveal key={j.slug} delay={i * 100}>
                <article className="bg-bone p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  <div className="lg:col-span-5">
                    {j.badge && (
                      <div className="inline-flex bg-navy text-bone text-[10px] tracking-widest uppercase px-3 py-1.5 mb-4">
                        {j.badge}
                      </div>
                    )}
                    <h3 className="serif text-2xl text-ink font-light italic leading-snug">
                      {j.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-2 text-sm">
                    <div>
                      <div className="text-xs text-mute tracking-wide uppercase mb-1">
                        Pensum
                      </div>
                      <div className="text-ink-soft">{j.pensum}</div>
                    </div>
                    <div>
                      <div className="text-xs text-mute tracking-wide uppercase mb-1">
                        Standort
                      </div>
                      <div className="text-ink-soft">{j.standort}</div>
                    </div>
                    <div>
                      <div className="text-xs text-mute tracking-wide uppercase mb-1">
                        Start
                      </div>
                      <div className="text-ink-soft">{j.start}</div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 flex flex-col justify-between h-full gap-6">
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {j.summary}
                    </p>
                    <a
                      href={`mailto:jobs@deleurant.ch?subject=${encodeURIComponent(j.title)}`}
                      className="inline-flex items-center gap-3 text-sm tracking-wide text-ink group self-start"
                    >
                      <span className="h-px w-8 bg-navy transition-all duration-500 group-hover:w-14" />
                      Bewerben
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 lg:pb-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="bg-ink text-bone p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-snug font-light">
                    Initiativ-Bewerbung?
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-5 text-bone/70 leading-relaxed max-w-md">
                    Schreiben Sie direkt — wir antworten persönlich und
                    schnell.
                  </p>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-5" delay={300}>
                <a
                  href="mailto:jobs@deleurant.ch"
                  className="group flex items-center justify-between border border-bone/20 px-8 py-6 hover:border-bone/60 transition-colors duration-500"
                >
                  <span className="serif text-xl text-bone font-light">
                    jobs@deleurant.ch
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-bone/70 transition-transform duration-500 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 10h16m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="square"
                    />
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
