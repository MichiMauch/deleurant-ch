import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { wishes } from "@/lib/content";

function AudienceIcon({ audience }: { audience: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (audience === "Eltern") {
    // adult + child silhouettes
    return (
      <svg {...common}>
        <circle cx="8" cy="6" r="2.4" />
        <path d="M4 20v-3a4 4 0 0 1 4-4 4 4 0 0 1 4 4v3" />
        <circle cx="17" cy="10" r="1.8" />
        <path d="M14 20v-2a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" />
      </svg>
    );
  }
  if (audience === "Beide") {
    // two adult silhouettes
    return (
      <svg {...common}>
        <circle cx="8" cy="7" r="2.4" />
        <path d="M3 20v-2.5A3.5 3.5 0 0 1 6.5 14h3a3.5 3.5 0 0 1 3.5 3.5V20" />
        <circle cx="16" cy="7" r="2.4" />
        <path d="M14 14h1.5a3.5 3.5 0 0 1 3.5 3.5V20" />
      </svg>
    );
  }
  // default: Erwachsene — single adult silhouette
  return (
    <svg {...common}>
      <circle cx="12" cy="7" r="2.6" />
      <path d="M5 20v-2.5A4.5 4.5 0 0 1 9.5 13h5a4.5 4.5 0 0 1 4.5 4.5V20" />
    </svg>
  );
}

const treatments = [
  {
    title: "Festsitzend",
    tagline: "Brackets und Lingualtechnik.",
    photo: "/images/festsitzend-photo.jpg",
    slug: "festsitzend",
  },
  {
    title: "Abnehmbar",
    tagline: "Für das wachsende Kiefer.",
    photo: "/images/abnehmbar-photo.jpg",
    slug: "abnehmbar",
  },
  {
    title: "Unsichtbar",
    tagline: "Aligner, diskret durch den Alltag.",
    photo: "/images/unsichtbar-photo.jpg",
    slug: "unsichtbar",
  },
];

const locations = [
  {
    name: "Luzern",
    address: "Theaterstrasse 5",
    zip: "6003 Luzern",
    image: "/images/home.jpg",
    href: "/standorte/luzern",
  },
  {
    name: "Sursee",
    address: "Christoph-Schnyder-Strasse 2a",
    zip: "6210 Sursee",
    image: "/images/sursee1.jpg",
    href: "/standorte/sursee",
  },
  {
    name: "Küssnacht",
    address: "Bahnhofstrasse 15",
    zip: "6403 Küssnacht am Rigi",
    image: "/images/sursee2.jpg",
    href: "/standorte/kuessnacht",
    badge: "Neu · August 2026",
  },
];

const method = [
  { title: "Erstgespräch & Diagnostik", duration: "ca. 60 Min." },
  { title: "Behandlungsplan & Visualisierung", duration: "1 – 2 Wochen" },
  { title: "Aktive Behandlung", duration: "12 – 24 Monate" },
  { title: "Feineinstellung", duration: "2 – 4 Monate" },
  { title: "Retention & Nachsorge", duration: "kontinuierlich" },
];

const testimonials = [
  {
    quote:
      "Nach Jahren habe ich mich endlich getraut. Die diskrete Beratung und die unsichtbaren Aligner haben mein Lächeln verändert — und meine Hemmung gleich mit.",
    name: "Andrea M.",
    treatment: "Invisalign · 14 Monate",
  },
  {
    quote:
      "Vom Erstgespräch bis zur letzten Kontrolle: alles auf den Punkt. Das Team ist ehrlich, professionell und nimmt sich die Zeit, die man braucht.",
    name: "Markus B.",
    treatment: "Festsitzend · 22 Monate",
  },
  {
    quote:
      "Unsere Tochter wurde von der ersten Minute ernst genommen. Wir fühlen uns sehr gut aufgehoben — und das Ergebnis spricht für sich.",
    name: "Familie Imhof",
    treatment: "Frühbehandlung Kind",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/start.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/50" />

        <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center">
          <div className="max-w-3xl pt-20">
            <Reveal delay={200}>
              <h1 className="serif text-bone text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-tight font-light [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                Schöne Zähne.
                <br />
                <span className="italic font-light">Ein Lächeln,</span>
                <br />
                das bleibt.
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-6 max-w-xl text-bone/85 text-base lg:text-lg leading-relaxed font-light [text-shadow:0_1px_18px_rgba(0,0,0,0.35)]">
                Spezialpraxis für Kieferorthopädie. Für Kinder, Jugendliche und Erwachsene — an drei Standorten in der Zentralschweiz.
              </p>
            </Reveal>
            <Reveal delay={600}>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
                <Link
                  href="/termin"
                  className="group inline-flex items-center gap-4 bg-navy hover:bg-navy-soft text-bone px-7 py-4 text-sm tracking-wide transition-colors duration-500 [box-shadow:0_8px_32px_rgba(0,0,0,0.25)]"
                >
                  Termin buchen
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
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
                <Link
                  href="#wunsch"
                  className="inline-flex items-center gap-4 text-bone/90 hover:text-bone text-sm tracking-wide group transition-colors"
                >
                  <span className="h-px w-10 bg-bone/70 transition-all duration-700 group-hover:w-16" />
                  Wo möchten Sie beginnen?
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WUNSCH-FIRST — the guide. Audience-tagged, scannable. */}
      <section id="wunsch" className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl mb-14 lg:mb-20">
            <Reveal>
              <div className="eyebrow text-navy mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                Ihr Ausgangspunkt
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                Was möchten Sie
                <br />
                <span className="italic">erreichen?</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-ink-soft text-lg leading-relaxed font-light max-w-xl">
                Jede Behandlung beginnt mit Ihrer Situation. Wählen Sie Ihren Ausgangspunkt.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {wishes.map((w, i) => (
              <Reveal key={w.slug} delay={Math.min(i, 2) * 80}>
                <Link
                  href={w.href}
                  className="group relative bg-bone p-8 lg:p-10 h-full flex flex-col overflow-hidden"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ${
                      w.audience === "Eltern"
                        ? "bg-navy"
                        : w.audience === "Erwachsene"
                        ? "bg-ink"
                        : "bg-navy-soft"
                    }`}
                  />

                  <div className="flex items-start justify-between mb-8">
                    <span className="serif text-4xl lg:text-5xl text-mute/70 font-light leading-none tabular-nums tracking-tight">
                      {w.number}
                    </span>
                    <span className="inline-flex items-center gap-2 eyebrow text-navy mt-2">
                      <AudienceIcon audience={w.audience} />
                      {w.audience}
                    </span>
                  </div>

                  <div className="serif text-2xl text-ink font-light leading-snug mb-4 group-hover:italic transition-[font-style] duration-500">
                    {w.title}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed flex-1">
                    {w.answer}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                    <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                    Weiter
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* OR — browse by method (formerly a standalone "Drei Methoden" section) */}
          <Reveal delay={300}>
            <div className="mt-16 lg:mt-20 flex items-center gap-4">
              <span className="h-px flex-1 bg-line-soft" />
              <span className="eyebrow text-mute">oder nach Methode</span>
              <span className="h-px flex-1 bg-line-soft" />
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {treatments.map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <Link
                  href={`/behandlungen/${t.slug}`}
                  className="group bg-bone flex items-center gap-5 p-5 lg:p-6 h-full"
                >
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 overflow-hidden bg-bone-deep/40">
                    <Image
                      src={t.photo}
                      alt={t.title}
                      fill
                      sizes="100px"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="serif text-lg text-ink font-light italic">
                      {t.title}
                    </div>
                    <div className="mt-1 text-sm text-ink-soft font-light leading-snug">
                      {t.tagline}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                      <span className="h-px w-5 bg-mute group-hover:w-9 group-hover:bg-navy transition-all duration-500" />
                      Mehr
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <Link
              href="/termin"
              className="mt-12 flex items-center justify-between bg-ink text-bone p-8 lg:p-10 group hover:bg-ink/90 transition-colors"
            >
              <div>
                <div className="serif text-xl lg:text-2xl font-light italic">
                  Wünschen Sie ein unverbindliches Erstgespräch?
                </div>
                <p className="mt-2 text-sm text-bone/70 max-w-xl leading-relaxed">
                  In 60 Minuten klären wir gemeinsam, was zu Ihnen passt.
                  CHF 150, bei Behandlungsbeginn voll anrechenbar.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-3 text-sm tracking-wide shrink-0 ml-8">
                Erstgespräch
                <span className="h-px w-8 bg-bone transition-all duration-500 group-hover:w-14" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP — earns the right to keep going */}
      <section aria-label="Vertrauen" className="border-y border-line-soft">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-line-soft -mx-6 lg:-mx-10">
            {[
              { kpi: "Seit 2012", label: "Praxis Deleurant" },
              { kpi: "3 Standorte", label: "Luzern · Sursee · Küssnacht" },
              { kpi: "SSO", label: "Fachzahnarzt Kieferorthopädie" },
              { kpi: "Eigenes Labor", label: "Zahntechnik im Haus" },
            ].map((item) => (
              <li
                key={item.label}
                className="px-6 lg:px-10 py-8 lg:py-10 flex flex-col gap-1"
              >
                <span className="serif text-xl lg:text-2xl text-ink font-light">
                  {item.kpi}
                </span>
                <span className="text-xs tracking-wide text-mute">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LOCATIONS — promoted: "is there one near me?" answered early */}
      <section id="standorte" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between gap-8 mb-12 lg:mb-16">
            <Reveal>
              <h2 className="serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-light text-ink">
                Drei Standorte. <span className="italic">In Ihrer Nähe.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {locations.map((loc, i) => (
              <Reveal key={loc.name} delay={i * 120}>
                <Link href={loc.href} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                    {loc.badge && (
                      <div className="absolute top-5 left-5 text-bone text-[10px] tracking-widest uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {loc.badge}
                      </div>
                    )}
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-xl text-ink font-light italic">
                        {loc.name}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft font-light leading-relaxed">
                        {loc.address} · {loc.zip}
                      </div>
                    </div>
                    <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-1 inline-flex items-center gap-2 shrink-0">
                      <span className="h-px w-5 bg-mute group-hover:w-9 group-hover:bg-navy transition-all duration-500" />
                      Anfahrt
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR — philosophy folded in as kicker */}
      <section id="team" className="py-32 lg:py-48 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/yann.jpg"
                alt="Dr. med. dent. Yann Deleurant"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="eyebrow text-navy mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                Praxisinhaber
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-light text-ink">
                Dr. med. dent.
                <br />
                <span className="italic">Yann Deleurant</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 text-mute text-sm tracking-wide">
                Fachzahnarzt für Kieferorthopädie (SSO)
              </p>
            </Reveal>
            <Reveal delay={360}>
              <p className="mt-10 text-lg text-ink-soft font-light leading-relaxed max-w-lg">
                Wir nehmen uns die Zeit, Ihre Anatomie, Ihren Alltag und Ihre
                Erwartung zu verstehen — und entwickeln daraus einen Plan,
                der vorhersehbar zum Ergebnis führt.
              </p>
            </Reveal>
            <Reveal delay={480}>
              <blockquote className="serif italic text-xl lg:text-2xl text-ink leading-relaxed mt-8 max-w-lg border-l-2 border-navy/40 pl-6">
                „Ein Lächeln entsteht nicht in der Praxis — es entsteht im
                Leben. Wir geben ihm nur den Rahmen."
              </blockquote>
            </Reveal>
            <Reveal delay={580}>
              <Link
                href="/team"
                className="mt-10 inline-flex items-center gap-3 text-xs tracking-wide text-mute hover:text-navy transition-colors group"
              >
                <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                Über das Team
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* METHOD — visual journey + inline CTA at peak intent */}
      <section id="methode" className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                Fünf Schritte.
                <br />
                <span className="italic">Ein klarer Weg.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-ink-soft text-base leading-relaxed font-light max-w-md">
                Vom Erstgespräch bis zur Nachsorge — Sie wissen jederzeit,
                wo Sie stehen.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {/* Progress bar — five segments, one per step */}
            <Reveal>
              <div
                className="grid grid-cols-5 gap-1 mb-10"
                role="presentation"
                aria-hidden
              >
                {method.map((_, i) => (
                  <span
                    key={i}
                    className="h-px bg-navy/40"
                    style={{ opacity: 1 - i * 0.12 }}
                  />
                ))}
              </div>
            </Reveal>

            <div className="space-y-0">
              {method.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <div className="grid grid-cols-12 items-baseline gap-4 border-t border-line-soft py-6 last:border-b">
                    <span className="col-span-2 lg:col-span-1 serif text-navy text-sm font-light tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="col-span-7 lg:col-span-8 text-ink font-light">
                      {step.title}
                    </span>
                    <span className="col-span-3 text-right text-xs text-mute tracking-wide tabular-nums">
                      {step.duration}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Inline CTA — peak intent moment, soft tone */}
            <Reveal delay={500}>
              <Link
                href="/termin"
                className="mt-10 flex items-center justify-between gap-6 border border-line-soft hover:border-navy/60 p-6 lg:p-8 group transition-colors duration-500"
              >
                <div className="min-w-0">
                  <div className="serif text-lg lg:text-xl text-ink font-light">
                    Schritt 01 buchen.
                  </div>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">
                    Erstgespräch · 60 Minuten · CHF 150 — voll anrechenbar.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs tracking-wide text-navy shrink-0">
                  <span className="h-px w-6 bg-navy transition-all duration-500 group-hover:w-10" />
                  Termin
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 lg:py-48 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <Reveal>
              <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                Stimmen.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 150}>
                <figure className="bg-bone p-10 lg:p-12 h-full flex flex-col">
                  <blockquote className="serif text-lg leading-relaxed text-ink italic font-light flex-1">
                    „{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 pt-6 border-t border-line-soft">
                    <div className="text-sm text-ink">{t.name}</div>
                    <div className="mt-1 text-xs text-mute tracking-wide">
                      {t.treatment}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="termin" className="pb-32 lg:pb-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="bg-ink text-bone p-10 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2
                    id="kontakt"
                    className="serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-light"
                  >
                    Bereit zu <span className="italic">starten</span>?
                  </h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-8 text-bone/70 text-lg max-w-lg font-light leading-relaxed">
                    Sie wissen, was Sie wollen — wir buchen Ihren Termin.
                    Direkt online oder telefonisch.
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
                      Termin buchen
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
    </>
  );
}
