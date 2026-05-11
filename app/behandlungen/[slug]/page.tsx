import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { getTreatment, treatments } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: `${t.title} — ${t.tagline} · Praxis Yann Deleurant`,
    description: t.description,
  };
}

export default async function BehandlungPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const others = treatments.filter((x) => x.slug !== t.slug);

  return (
    <>
      <FaqJsonLd items={t.faq} />

      {/* HERO */}
      <section className="relative h-[75vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={t.photo}
          alt={t.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/40" />

        <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <Reveal>
            <Link
              href="/#behandlungen"
              className="eyebrow text-bone/80 hover:text-bone inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-bone/60" />
              Behandlungen · {t.eyebrow}
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-bone text-[clamp(2.75rem,7vw,6rem)] leading-[1] font-light italic [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-bone/90 text-xl max-w-xl font-light [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {t.tagline}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex items-center gap-8 text-bone/85 text-xs tracking-widest uppercase">
              <span>
                <span className="block text-bone/60 mb-1">Dauer</span>
                {t.duration}
              </span>
              <span className="h-8 w-px bg-bone/30" />
              <span>
                <span className="block text-bone/60 mb-1">Preis</span>
                {t.priceFrom}
              </span>
              <span className="h-8 w-px bg-bone/30" />
              <span>
                <span className="block text-bone/60 mb-1">Kategorie</span>
                {t.accent}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Im Überblick</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-light text-ink">
                {t.intro}
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={240}>
            <p className="text-xl text-ink-soft font-light leading-relaxed">
              {t.long}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line-soft border border-line-soft">
              {t.benefits.map((b) => (
                <div key={b.title} className="bg-bone p-6">
                  <div className="serif text-lg text-ink font-light italic mb-2">
                    {b.title}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Für wen geeignet</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink">
                Passt diese
                <br />
                <span className="italic">Methode zu Ihnen?</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={200}>
            <ul className="space-y-0">
              {t.forWhom.map((w, i) => (
                <li
                  key={w}
                  className="grid grid-cols-12 gap-4 items-baseline border-t border-line py-6 last:border-b"
                >
                  <span className="col-span-1 serif text-navy/70 text-sm font-light">
                    0{i + 1}
                  </span>
                  <span className="col-span-11 text-lg text-ink font-light leading-relaxed">
                    {w}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/termin"
              className="mt-10 inline-flex items-center gap-3 bg-navy text-bone px-7 py-4 text-sm tracking-wide hover:bg-navy-soft transition-colors duration-500"
            >
              Eignung im Erstgespräch klären
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 6h10m-4-4 4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      {t.beforeAfter && t.beforeAfter.length > 0 && (
        <section className="py-24 lg:py-32 bg-ink text-bone">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="eyebrow text-bone/60 mb-6">
                    — Reale Resultate
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light">
                    Vorher.
                    <br />
                    <span className="italic">Nachher.</span>
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <Reveal delay={200}>
                  <p className="text-bone/70 text-lg leading-relaxed font-light">
                    Bewegen Sie den Schieber — und sehen Sie die Veränderung.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {t.beforeAfter.map((b, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="space-y-5">
                    <BeforeAfter before={b.before} after={b.after} />
                    <div className="flex items-center justify-between text-xs text-bone/70">
                      <span className="tracking-wide">{t.title}</span>
                      <span className="text-bone/50">{b.duration}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Fragen</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink">
                Häufig
                <br />
                <span className="italic">gefragt.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {t.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="group border-t border-line-soft last:border-b py-7 cursor-pointer">
                  <summary className="flex items-start justify-between gap-6 list-none">
                    <span className="serif text-xl text-ink font-light leading-snug">
                      {f.q}
                    </span>
                    <span className="shrink-0 mt-2 text-navy transition-transform duration-500 group-open:rotate-45">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 1v14M1 8h14"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-5 text-ink-soft leading-relaxed font-light max-w-2xl">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="relative overflow-hidden bg-ink text-bone p-10 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="eyebrow text-bone/60 mb-6">— Nächster Schritt</div>
                </Reveal>
                <Reveal delay={120}>
                  <h2 className="serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-light">
                    Ist {t.title.toLowerCase()} <span className="italic">das Richtige</span> für Sie?
                  </h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-6 text-bone/70 text-lg max-w-lg font-light leading-relaxed">
                    Im 60-minütigen Erstgespräch klären wir Ihre Ausgangslage,
                    Ihre Wünsche und die passende Methode.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-3">
                <Reveal delay={200}>
                  <Link
                    href="/termin"
                    className="group flex items-center justify-between bg-navy text-bone px-8 py-6 hover:bg-navy-soft transition-colors duration-500"
                  >
                    <span className="serif text-xl font-light">
                      Termin anfragen
                    </span>
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
                <Reveal delay={320}>
                  <a
                    href="tel:+41412100455"
                    className="group flex items-center justify-between border border-bone/20 px-8 py-6 hover:border-bone/60 transition-colors duration-500"
                  >
                    <span className="serif text-xl text-bone font-light">
                      041 210 04 55
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
        </div>
      </section>

      {/* OTHER TREATMENTS */}
      <section className="pb-32 lg:pb-48 border-t border-line-soft pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Weitere Methoden</div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="serif text-[clamp(1.75rem,3.5vw,3rem)] font-light text-ink mb-16">
              Andere Wege.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <Link href={`/behandlungen/${o.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={o.photo}
                      alt={o.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    <div className="absolute top-5 left-5 flex items-center gap-3 text-bone">
                      <span className="bg-navy/95 p-2 flex items-center justify-center w-9 h-9">
                        <Image
                          src={o.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="object-contain w-full h-full"
                        />
                      </span>
                      <span className="eyebrow text-bone/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {o.accent}
                      </span>
                    </div>
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-2xl text-ink font-light italic">
                        {o.title}
                      </div>
                      <div className="mt-2 text-sm text-ink-soft font-light leading-relaxed max-w-md">
                        {o.tagline}
                      </div>
                    </div>
                    <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-2 inline-flex items-center gap-2 shrink-0">
                      <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                      Ansehen
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
