import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { getLocation, locations } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `Praxis ${loc.name} — Praxis Yann Deleurant`,
    description: `${loc.intro} Kieferorthopädie an der ${loc.street}, ${loc.zip}.`,
  };
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const others = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={loc.image}
          alt={loc.name}
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
              href="/#standorte"
              className="eyebrow text-bone/80 hover:text-bone inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-bone/60" />
              Standorte
            </Link>
          </Reveal>
          {loc.badge && (
            <Reveal delay={80}>
              <div className="inline-flex w-fit bg-navy text-bone text-[10px] tracking-widest uppercase px-3 py-1.5 mb-6">
                {loc.badge}
              </div>
            </Reveal>
          )}
          <Reveal delay={120}>
            <h1 className="serif text-bone text-[clamp(2.75rem,7vw,6rem)] leading-[1] font-light italic [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">
              {loc.name}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-bone/90 text-xl max-w-xl font-light [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {loc.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink-soft font-light">
                {loc.description}
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal>
                <div>
                  <div className="eyebrow text-navy mb-5">— Adresse</div>
                  <div className="serif text-2xl text-ink font-light leading-snug">
                    {loc.street}
                    <br />
                    {loc.zip}
                  </div>
                  <div className="mt-6 space-y-2 text-sm">
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="block text-ink hover:text-navy transition-colors"
                    >
                      {loc.phone}
                    </a>
                    <a
                      href={`mailto:${loc.email}`}
                      className="block text-ink-soft hover:text-navy transition-colors"
                    >
                      {loc.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div>
                  <div className="eyebrow text-navy mb-5">— Sprechzeiten</div>
                  <dl className="space-y-3 text-sm">
                    {loc.hours.map((h) => (
                      <div
                        key={h.label}
                        className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3"
                      >
                        <dt className="col-span-4 text-mute tracking-wide">
                          {h.label}
                        </dt>
                        <dd className="col-span-8 text-ink-soft">{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="mt-16">
                <div className="eyebrow text-navy mb-5">— Anfahrt</div>
                <ul className="space-y-3 text-sm">
                  {loc.transit.map((t) => (
                    <li
                      key={t.mode}
                      className="grid grid-cols-12 gap-3 border-t border-line-soft pt-3"
                    >
                      <span className="col-span-4 text-mute tracking-wide">
                        {t.mode}
                      </span>
                      <span className="col-span-8 text-ink-soft">
                        {t.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="bg-bone-deep/40 p-8 lg:p-10 sticky top-32">
              <div className="serif text-2xl text-ink font-light italic mb-2">
                Termin in {loc.name}
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-8">
                Erstgespräch 60 Min., CHF 150, bei Behandlungsbeginn
                vollumfänglich anrechenbar.
              </p>
              <Link
                href="/termin"
                className="flex items-center justify-between bg-navy text-bone px-6 py-5 hover:bg-navy-soft transition-colors duration-500 mb-3"
              >
                <span className="text-sm tracking-wide">Termin anfragen</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10m-4-4 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
              <a
                href={`tel:${loc.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-between border border-line px-6 py-5 hover:border-navy transition-colors duration-500"
              >
                <span className="text-sm tracking-wide text-ink">
                  {loc.phone}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-ink-soft"
                >
                  <path
                    d="M2 7h10m-4-4 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden bg-bone-deep/40">
              <iframe
                title={`Karte ${loc.name}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&q=${encodeURIComponent(
                  `${loc.street}, ${loc.zip}`,
                )}`}
                className="absolute inset-0 w-full h-full grayscale-[60%] contrast-[105%]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER LOCATIONS */}
      <section className="pb-32 lg:pb-48 border-t border-line-soft pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Weitere Standorte</div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="serif text-[clamp(1.75rem,3.5vw,3rem)] font-light text-ink mb-16">
              Auch in Ihrer Nähe.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <Link
                  href={`/standorte/${o.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={o.image}
                      alt={o.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-2xl text-ink font-light italic">
                        {o.name}
                      </div>
                      <div className="mt-2 text-sm text-ink-soft font-light leading-relaxed">
                        {o.street}
                        <br />
                        {o.zip}
                      </div>
                    </div>
                    <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-2 inline-flex items-center gap-2">
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
