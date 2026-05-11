import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { getPillar, pillars } from "@/lib/content";

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPillar(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.tagline} · Praxis Yann Deleurant`,
    description: p.answer.slice(0, 160),
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPillar(slug);
  if (!p) notFound();

  const others = pillars.filter((x) => x.slug !== p.slug);

  return (
    <>
      <FaqJsonLd items={p.faq} />

      {/* HERO */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <Link
              href="/ratgeber"
              className="eyebrow text-navy mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-8 bg-navy" />
              Ratgeber
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-[clamp(3rem,6vw,5.5rem)] leading-[1] font-light text-ink max-w-3xl">
              {p.title}.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 serif italic text-xl lg:text-2xl text-ink-soft font-light max-w-2xl leading-snug">
              {p.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ANSWER BLOCK — for LLM citation */}
      <section className="pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="bg-bone-deep/40 border-l-2 border-navy p-8 lg:p-12 max-w-4xl">
              <div className="eyebrow text-navy mb-5">— Kurz beantwortet</div>
              <p className="serif text-xl lg:text-2xl text-ink font-light leading-relaxed italic">
                {p.answer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO + SECTIONS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Einordnung</div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xl text-ink-soft font-light leading-relaxed">
                {p.intro}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-12">
            {p.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 100}>
                <div className="border-t border-line-soft pt-8">
                  <div className="grid grid-cols-12 gap-4 mb-4">
                    <span className="col-span-2 lg:col-span-1 serif text-mute text-sm font-light">
                      0{i + 1}
                    </span>
                    <h3 className="col-span-10 serif text-2xl text-ink font-light italic">
                      {s.heading}
                    </h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed font-light pl-0 lg:pl-[8.333%]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Häufige Fragen</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink">
                Direkt
                <br />
                <span className="italic">beantwortet.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {p.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="group border-t border-line last:border-b py-7 cursor-pointer">
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
      <section className="pb-24 lg:pb-32 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="bg-ink text-bone p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-snug font-light">
                    Fragen zur
                    <br />
                    <span className="italic">eigenen Situation?</span>
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-5 text-bone/70 leading-relaxed max-w-md">
                    Im 60-minütigen Erstgespräch klären wir, was bei Ihnen
                    konkret passt — und was nicht.
                  </p>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-5" delay={300}>
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
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PILLARS */}
      <section className="pb-32 lg:pb-48 border-t border-line-soft pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Weiterlesen</div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-line-soft border border-line-soft">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <Link
                  href={`/ratgeber/${o.slug}`}
                  className="group bg-bone p-10 lg:p-12 flex items-start justify-between gap-6"
                >
                  <div>
                    <div className="serif text-2xl text-ink font-light italic">
                      {o.title}
                    </div>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-md">
                      {o.tagline}
                    </p>
                  </div>
                  <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-2 inline-flex items-center gap-2 shrink-0">
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
