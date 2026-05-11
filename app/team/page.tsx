import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team — Praxis Yann Deleurant",
  description:
    "Das Team rund um Yann Deleurant: Drei Standorte, eine Handschrift. Diplomiert, erfahren, persönlich.",
};

const [yann, ...others] = team;

export default function TeamPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow text-navy mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                Team
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-light text-ink">
                Ein Team.
                <br />
                <span className="italic">Drei Standorte.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-lg text-ink-soft font-light leading-relaxed max-w-xl">
                Hinter jeder Behandlung steht das gleiche Team. Wir teilen
                Akten, Werkzeuge und Standards — damit Sie nicht jedes Mal
                erklären müssen, wer Sie sind.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={300}>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-5 text-mute tracking-wide">
                  Praxisinhaber
                </span>
                <span className="col-span-7 text-ink-soft">
                  Dr. Yann Deleurant
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-5 text-mute tracking-wide">
                  Mitarbeitende
                </span>
                <span className="col-span-7 text-ink-soft">
                  {team.length - 1} feste Mitwirkende
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3">
                <span className="col-span-5 text-mute tracking-wide">
                  Eigenes Labor
                </span>
                <span className="col-span-7 text-ink-soft">
                  Zahntechnik im Haus
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 border-t border-line-soft border-b pb-3 pt-3">
                <span className="col-span-5 text-mute tracking-wide">
                  Aktenführung
                </span>
                <span className="col-span-7 text-ink-soft">
                  digital · standortübergreifend
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* YANN — PRAXISINHABER FEATURE */}
      <section className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              {yann.image && (
                <Image
                  src={yann.image}
                  alt={yann.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              )}
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Praxisinhaber</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-light text-ink">
                {yann.name.split(" ").slice(0, 3).join(" ")}
                <br />
                <span className="italic">
                  {yann.name.split(" ").slice(3).join(" ")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-mute text-sm tracking-wide">
                {yann.role}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-10 text-xl text-ink-soft font-light leading-relaxed max-w-lg">
                {yann.bio}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <p className="serif italic text-lg text-ink-soft mt-10 border-l border-navy/40 pl-6 max-w-lg">
                «Yann behandelt Sie möglicherweise nicht persönlich. Das ist
                Absicht — die gleiche Qualität, ohne Engpass an einer
                Person.»
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Mitwirkende</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink">
                Die Menschen,
                <br />
                <span className="italic">die Sie sehen werden.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {others.map((m, i) => (
              <Reveal key={m.slug} delay={i * 80}>
                <article className="bg-bone p-8 lg:p-10 h-full flex flex-col">
                  <div className="serif text-mute text-sm font-light mb-6">
                    0{i + 2}
                  </div>
                  <div className="serif text-xl text-ink font-light italic leading-snug">
                    {m.name}
                  </div>
                  <div className="mt-3 text-xs text-navy tracking-wide uppercase">
                    {m.standort}
                  </div>
                  <div className="mt-3 text-sm text-mute tracking-wide">
                    {m.role}
                  </div>
                  {m.bio && (
                    <p className="mt-6 text-sm text-ink-soft leading-relaxed flex-1">
                      {m.bio}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AKTE-MODUL */}
      <section className="py-24 lg:py-32 bg-ink text-bone">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow text-bone/60 mb-6">— Wechselbar</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light">
                Drei Standorte.
                <br />
                <span className="italic">Eine Akte.</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-bone/70 text-lg leading-relaxed font-light max-w-xl">
                Ihre Daten, Aufnahmen und Behandlungspläne sind an jedem
                Standort verfügbar — ohne Umwege. Sie können den Wohnort
                wechseln, beruflich umziehen oder kurzfristig einen anderen
                Standort bevorzugen, ohne die Praxis zu wechseln.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={300}>
            <Link
              href="/#standorte"
              className="group flex items-center justify-between border border-bone/20 px-8 py-6 hover:border-bone/60 transition-colors duration-500"
            >
              <span className="serif text-xl text-bone font-light italic">
                Standorte ansehen
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
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink">
                Lieber persönlich
                <br />
                <span className="italic">kennenlernen?</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-ink-soft text-lg max-w-lg leading-relaxed font-light">
                Im 60-minütigen Erstgespräch lernen Sie das Team kennen — und
                wir Sie.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={300}>
            <Link
              href="/termin"
              className="group flex items-center justify-between bg-navy text-bone px-8 py-6 hover:bg-navy-soft transition-colors duration-500"
            >
              <span className="serif text-xl font-light">Termin anfragen</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path
                  d="M2 10h16m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
