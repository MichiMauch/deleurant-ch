import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";

const treatments = [
  {
    eyebrow: "01",
    title: "Festsitzend",
    description:
      "Brackets in Metall oder Keramik, ergänzt durch die unsichtbare Lingualtechnik. Präzise, vorhersehbar, dauerhaft.",
    photo: "/images/festsitzend-photo.jpg",
    icon: "/images/festsitzend.png",
    accent: "Brackets · Lingual",
    priceFrom: "ab CHF 4'500",
  },
  {
    eyebrow: "02",
    title: "Abnehmbar",
    description:
      "Apparaturen für die Nacht und das wachsende Kiefer. Sanft begleitet, achtsam geführt.",
    photo: "/images/abnehmbar-photo.jpg",
    icon: "/images/abnehmbar.png",
    accent: "Wachstum · Nacht",
    priceFrom: "ab CHF 1'800",
  },
  {
    eyebrow: "03",
    title: "Unsichtbar",
    description:
      "Transparente Aligner für Erwachsene, die ihre Behandlung diskret durch den Alltag tragen möchten.",
    photo: "/images/unsichtbar-photo.jpg",
    icon: "/images/unsichtbar.png",
    accent: "Aligner · Invisalign",
    priceFrom: "ab CHF 5'200",
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

const principles = [
  {
    n: "I.",
    title: "Vorhersehbar",
    body: "Jede Behandlung folgt einem klaren, fünfstufigen Plan. Sie wissen jederzeit, wo Sie stehen.",
  },
  {
    n: "II.",
    title: "Diskret",
    body: "Lingualtechnik und Aligner machen die Behandlung für Ihr Gegenüber nahezu unsichtbar.",
  },
  {
    n: "III.",
    title: "Persönlich",
    body: "Ein Team, drei Standorte, dieselben Hände. Kontinuität von der ersten Beratung bis zum letzten Termin.",
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
      "Nach Jahren habe ich mich endlich getraut. Die diskrete Beratung von Dr. Deleurant und die unsichtbaren Aligner haben mein Lächeln verändert — und meine Hemmung gleich mit.",
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

const beforeAfter = [
  {
    before: "/images/ba1-vorher.jpg",
    after: "/images/ba1-nachher.jpg",
    label: "Festsitzend · Erwachsen",
    duration: "20 Monate",
  },
  {
    before: "/images/ba2-vorher.jpg",
    after: "/images/ba2-nachher.jpg",
    label: "Festsitzend · Jugendlich",
    duration: "18 Monate",
  },
  {
    before: "/images/ba3-vorher.jpg",
    after: "/images/ba3-nachher.jpg",
    label: "Invisalign · Erwachsen",
    duration: "14 Monate",
  },
];

const credentials = [
  { value: "20+", label: "Jahre Erfahrung" },
  { value: "5'000+", label: "Begleitete Patient:innen" },
  { value: "4.9", label: "★ Google Bewertung" },
  { value: "3", label: "Standorte · 1 Team" },
];

const cv = [
  ["1996", "Matura Typus C in Lausanne"],
  ["2002", "Promotion Zahnmedizin, Universität Genf"],
  ["2005 – 2008", "Weiterbildung Kieferorthopädie, Universität Zürich"],
  ["2008", "Fachzahnarzt für Kieferorthopädie (CH)"],
  ["2012", "Übernahme der Praxis Deleurant"],
  ["2015 – 2020", "Präsident Luzerner Zahnärzte-Gesellschaft"],
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
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />

        <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col">
          <div className="flex-1 flex flex-col justify-center max-w-3xl pt-20">
            <Reveal>
              <div className="eyebrow text-bone/85 mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-bone/60" />
                Fachzahnarzt für Kieferorthopädie
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="serif text-bone text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-tight font-light [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                Schöne Zähne.
                <br />
                <span className="italic font-light">Ein Lächeln,</span>
                <br />
                das bleibt.
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-10 text-bone/90 text-lg max-w-lg font-light leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                Kieferorthopädie auf höchstem Niveau — in Luzern, Sursee und
                Küssnacht am Rigi.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-12 flex flex-wrap items-center gap-5">
                <Link
                  href="#termin"
                  className="inline-flex items-center gap-3 bg-navy text-bone px-7 py-4 text-sm tracking-wide hover:bg-navy-soft transition-colors duration-500"
                >
                  Termin anfragen
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 6h10m-4-4 4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
                <Link
                  href="#behandlungen"
                  className="inline-flex items-center gap-3 text-bone text-sm tracking-wide border-b border-bone/40 hover:border-bone pb-1 transition-colors"
                >
                  Unsere Behandlungen
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="pb-10 hidden sm:flex items-end justify-end text-bone/70 text-[10px] tracking-widest uppercase">
            <span className="inline-flex items-center gap-2">
              Scroll
              <span className="h-8 w-px bg-bone/40" />
            </span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-line-soft bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-line-soft">
          {credentials.map((c) => (
            <div
              key={c.label}
              className="py-8 lg:py-10 first:pl-0 px-6 lg:px-10 text-center lg:text-left"
            >
              <div className="serif text-3xl lg:text-4xl text-navy font-light">
                {c.value}
              </div>
              <div className="mt-2 text-xs text-ink-soft tracking-wide">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="ueber-uns" className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Philosophie</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                Ein Lächeln,
                <br />
                <span className="italic">das zu Ihnen passt.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={240}>
              <p className="text-xl leading-relaxed text-ink-soft font-light">
                Kieferorthopädie ist Handwerk und Medizin zugleich. Wir nehmen
                uns die Zeit, Ihre Anatomie, Ihren Alltag und Ihre Erwartung zu
                verstehen — und entwickeln daraus einen Plan, der vorhersehbar
                zum Ergebnis führt.
              </p>
            </Reveal>

            <div className="mt-20 space-y-px">
              {principles.map((p, i) => (
                <Reveal key={p.n} delay={i * 100}>
                  <div className="group grid grid-cols-12 gap-6 border-t border-line-soft py-10 last:border-b">
                    <div className="col-span-2 serif text-2xl text-navy/70 font-light">
                      {p.n}
                    </div>
                    <div className="col-span-10">
                      <div className="serif text-2xl text-ink mb-3 font-light">
                        {p.title}
                      </div>
                      <p className="text-ink-soft leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR / TEAM */}
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
              <div className="eyebrow text-navy mb-6">— Praxisinhaber</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-light text-ink">
                Dr. med. dent.
                <br />
                <span className="italic">Yann Deleurant</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-mute text-sm tracking-wide">
                Fachzahnarzt für Kieferorthopädie (SSO)
              </p>
            </Reveal>
            <Reveal delay={280}>
              <blockquote className="serif italic text-xl lg:text-2xl text-ink-soft leading-relaxed mt-10 border-l border-navy/40 pl-6">
                „Ein Lächeln entsteht nicht in der Praxis — es entsteht im
                Leben. Wir geben ihm nur den Rahmen."
              </blockquote>
            </Reveal>

            <div className="mt-12 space-y-3">
              {cv.map(([year, what], i) => (
                <Reveal key={year} delay={i * 50}>
                  <div className="grid grid-cols-12 gap-4 text-sm border-t border-line-soft pt-3">
                    <span className="col-span-4 lg:col-span-3 text-mute tracking-wide">
                      {year}
                    </span>
                    <span className="col-span-8 lg:col-span-9 text-ink-soft">
                      {what}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section id="behandlungen" className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="eyebrow text-navy mb-6">— Behandlungen</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                  Drei Methoden.
                  <br />
                  <span className="italic">Eine Handschrift.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={200}>
                <p className="text-ink-soft text-lg leading-relaxed font-light">
                  Ob fest, abnehmbar oder unsichtbar — wir wählen die Methode,
                  die zu Ihrer Anatomie und Ihrem Leben passt. Nicht umgekehrt.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {treatments.map((t, i) => (
              <Reveal key={t.title} delay={i * 120}>
                <article className="group flex flex-col h-full">
                  <Link
                    href={`/behandlungen/${t.title.toLowerCase().replace("ü", "u").replace("ä", "a").replace("ö", "o")}`}
                    className="relative aspect-[4/5] overflow-hidden block bg-bone-deep/40"
                  >
                    <Image
                      src={t.photo}
                      alt={t.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 flex items-center gap-3 text-bone">
                      <span className="bg-navy/95 backdrop-blur-sm p-2.5 flex items-center justify-center w-11 h-11">
                        <Image
                          src={t.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                        />
                      </span>
                      <span className="eyebrow text-bone/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {t.accent}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-bone">
                      <span className="serif text-3xl font-light italic">
                        {t.title}
                      </span>
                      <span className="serif text-xs text-bone/80">
                        {t.priceFrom}
                      </span>
                    </div>
                  </Link>

                  <div className="pt-6">
                    <p className="text-ink-soft leading-relaxed">
                      {t.description}
                    </p>
                    <Link
                      href={`/behandlungen/${t.title.toLowerCase().replace("ü", "u").replace("ä", "a").replace("ö", "o")}`}
                      className="mt-6 inline-flex items-center gap-3 text-sm text-ink group/link"
                    >
                      <span className="h-px w-8 bg-navy transition-all duration-500 group-hover/link:w-14" />
                      Mehr erfahren
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-16 text-center text-sm text-mute">
              Erstgespräch CHF 150 — bei Behandlungsbeginn vollumfänglich
              anrechenbar.
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="resultate" className="py-32 lg:py-48 bg-ink text-bone">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow text-bone/60 mb-6">— Resultate</div>
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
                  Echte Patient:innen, echte Behandlungen. Bewegen Sie den
                  Schieber — und sehen Sie selbst.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {beforeAfter.map((b, i) => (
              <Reveal key={b.label} delay={i * 120}>
                <div className="space-y-5">
                  <BeforeAfter before={b.before} after={b.after} />
                  <div className="flex items-center justify-between text-xs text-bone/70">
                    <span className="tracking-wide">{b.label}</span>
                    <span className="text-bone/50">{b.duration}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/apparaturen.jpg"
                  alt="Apparaturen — Praxis Deleurant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-bone serif text-xl font-light italic">
                  Präzision in jedem Detail.
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow text-navy mb-6">— Methode</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                  Fünf Schritte.
                  <br />
                  <span className="italic">Ein vorhersehbarer Weg.</span>
                </h2>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-8 text-lg text-ink-soft leading-relaxed font-light max-w-lg">
                  Von der ersten Aufnahme bis zur Retention folgen wir einer
                  klaren Choreografie. Jeder Schritt ist dokumentiert, jeder
                  Schritt ist mit Ihnen besprochen.
                </p>
              </Reveal>

              <div className="mt-14 space-y-0">
                {method.map((step, i) => (
                  <Reveal key={step.title} delay={i * 80}>
                    <div className="group grid grid-cols-12 items-baseline gap-4 border-t border-line-soft py-5 last:border-b hover:border-navy transition-colors duration-500">
                      <span className="col-span-2 lg:col-span-1 serif text-navy/70 text-sm font-light">
                        0{i + 1}
                      </span>
                      <span className="col-span-7 lg:col-span-8 text-ink">
                        {step.title}
                      </span>
                      <span className="col-span-3 text-right text-xs text-mute tracking-wide">
                        {step.duration}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 lg:py-48 bg-bone-deep/50">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow text-navy mb-6">— Stimmen</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                  Was unsere Patient:innen
                  <br />
                  <span className="italic">über uns sagen.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={200}>
                <div className="flex items-center gap-4">
                  <div className="serif text-5xl text-navy font-light">4.9</div>
                  <div>
                    <div className="flex gap-0.5 text-navy mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="currentColor"
                        >
                          <path d="M7 0 9.163 4.385 14 5.087l-3.5 3.413.826 4.819L7 11.046l-4.326 2.273.826-4.819L0 5.087l4.837-.702Z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-xs text-ink-soft tracking-wide">
                      Aus über 200 Bewertungen · Google
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="bg-bone p-10 lg:p-12 h-full flex flex-col">
                  <div className="flex gap-0.5 text-navy mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="currentColor"
                      >
                        <path d="M7 0 9.163 4.385 14 5.087l-3.5 3.413.826 4.819L7 11.046l-4.326 2.273.826-4.819L0 5.087l4.837-.702Z" />
                      </svg>
                    ))}
                  </div>
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

      {/* LOCATIONS */}
      <section id="standorte" className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow text-navy mb-6">— Standorte</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink">
                  Drei Häuser.
                  <br />
                  <span className="italic">Eine Handschrift.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={200}>
                <p className="text-ink-soft text-lg leading-relaxed font-light">
                  Wo immer Sie uns besuchen — Sie werden vom gleichen Team
                  empfangen. Mit dem gleichen Anspruch.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {locations.map((loc, i) => (
              <Reveal key={loc.name} delay={i * 120}>
                <Link href={loc.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    />
                    {loc.badge && (
                      <div className="absolute top-6 left-6 bg-navy text-bone text-[10px] tracking-widest uppercase px-3 py-1.5">
                        {loc.badge}
                      </div>
                    )}
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-2xl text-ink font-light italic">
                        {loc.name}
                      </div>
                      <div className="mt-2 text-sm text-ink-soft font-light leading-relaxed">
                        {loc.address}
                        <br />
                        {loc.zip}
                      </div>
                    </div>
                    <div className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-2 inline-flex items-center gap-2">
                      <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                      Anfahrt
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="termin" className="pb-32 lg:pb-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="relative overflow-hidden bg-ink text-bone p-10 lg:p-20">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-navy/20 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="eyebrow text-bone/60 mb-6">— Termin</div>
                </Reveal>
                <Reveal delay={120}>
                  <h2
                    id="kontakt"
                    className="serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-light"
                  >
                    Bereit für Ihr <span className="italic">Lächeln</span>?
                  </h2>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-6 text-bone/70 text-lg max-w-lg font-light leading-relaxed">
                    Vereinbaren Sie ein Erstgespräch — 60 Minuten, CHF 150, bei
                    Behandlungsbeginn anrechenbar.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <Reveal delay={200}>
                  <Link
                    href="#"
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
    </>
  );
}
