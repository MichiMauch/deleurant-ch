/**
 * One-shot migration: lib/content.ts + hardcoded JSX in app/* → messages/de.json
 *
 * Run with: npx tsx scripts/migrate-content.ts
 * Idempotent: overwrites messages/de.json each run.
 */
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { locations, treatments, wishes, pillars, team, benefits, jobs } from "../lib/content";
import type {
  BlockDataMap,
  BlockType,
  CollectionItem,
  LinkRef,
  LocaleContent,
  Page,
  Section,
} from "../types/content";

function id(): string {
  return randomUUID();
}

function s<T extends BlockType>(type: T, data: BlockDataMap[T]): Section {
  return { id: id(), type, data } as Section;
}

function hrefToLinkRef(href: string): LinkRef {
  if (/^https?:\/\//.test(href)) return { kind: "external", href };
  const m = href.match(/^\/behandlungen\/([^/?#]+)/);
  if (m) return { kind: "treatment", slug: m[1] };
  const l = href.match(/^\/standorte\/([^/?#]+)/);
  if (l) return { kind: "location", slug: l[1] };
  const r = href.match(/^\/ratgeber\/([^/?#]+)/);
  if (r) return { kind: "pillar", slug: r[1] };
  if (href === "/" || href === "/home") return { kind: "page", slug: "home" };
  if (href === "/team") return { kind: "page", slug: "team" };
  if (href === "/termin") return { kind: "page", slug: "termin" };
  if (href === "/arbeitgeber") return { kind: "page", slug: "arbeitgeber" };
  if (href === "/ratgeber") return { kind: "page", slug: "ratgeber" };
  return { kind: "external", href };
}

// ---------------- Home ----------------

const HOME: Page = {
  seo: {
    title: "Deleurant — Kieferorthopädie",
    description:
      "Spezialpraxis für Kieferorthopädie. Für Kinder, Jugendliche und Erwachsene — an drei Standorten in der Zentralschweiz.",
  },
  sections: [
    s("HeroVideo", {
      title: "Schöne Zähne.",
      italicTail: "Ein Lächeln, das bleibt.",
      subtitle:
        "Spezialpraxis für Kieferorthopädie. Für Kinder, Jugendliche und Erwachsene — an drei Standorten in der Zentralschweiz.",
      video: "/media/hero.mp4",
      poster: "/images/start.jpg",
      ctaPrimary: {
        label: "Termin buchen",
        linkRef: { kind: "page", slug: "termin" },
      },
      ctaSecondary: {
        label: "Wo möchten Sie beginnen?",
        linkRef: { kind: "external", href: "#wunsch" },
      },
    }),
    s("WishesGrid", {
      eyebrow: "Ihr Ausgangspunkt",
      title: "Was möchten Sie",
      italicTail: "erreichen?",
      intro:
        "Jede Behandlung beginnt mit Ihrer Situation. Wählen Sie Ihren Ausgangspunkt.",
      items: wishes.map((w) => ({
        number: w.number,
        title: w.title,
        audience: w.audience as "Eltern" | "Erwachsene" | "Beide",
        answer: w.answer,
        linkRef: hrefToLinkRef(w.href),
      })),
    }),
    s("TreatmentsTeaser", {
      divider: true,
      items: treatments.map((t) => ({
        title: t.title,
        tagline: t.tagline,
        photo: t.photo,
        linkRef: { kind: "treatment", slug: t.slug },
      })),
    }),
    s("CallToAction", {
      title: "Wünschen Sie ein unverbindliches",
      italicTail: "Erstgespräch?",
      subtitle:
        "In 60 Minuten klären wir gemeinsam, was zu Ihnen passt. CHF 150, bei Behandlungsbeginn voll anrechenbar.",
      ctaPrimary: {
        label: "Erstgespräch",
        linkRef: { kind: "page", slug: "termin" },
      },
      theme: "dark",
    }),
    s("TrustStrip", {
      items: [
        { kpi: "Seit 2012", label: "Praxis Deleurant" },
        { kpi: "3 Standorte", label: "Luzern · Sursee · Küssnacht" },
        { kpi: "SSO", label: "Fachzahnarzt Kieferorthopädie" },
        { kpi: "Eigenes Labor", label: "Zahntechnik im Haus" },
      ],
    }),
    s("LocationsTeaser", {
      title: "Drei Standorte.",
      italicTail: "In Ihrer Nähe.",
      items: locations.map((l) => ({
        linkRef: { kind: "location", slug: l.slug },
        name: l.name,
        address: l.street,
        zip: l.zip,
        image: l.image,
        badge: l.badge,
      })),
    }),
    s("DoctorSpotlight", {
      eyebrow: "Praxisinhaber",
      name: "Dr. med. dent.",
      italicName: "Yann Deleurant",
      credentials: "Fachzahnarzt für Kieferorthopädie (SSO)",
      body: "Wir nehmen uns die Zeit, Ihre Anatomie, Ihren Alltag und Ihre Erwartung zu verstehen — und entwickeln daraus einen Plan, der vorhersehbar zum Ergebnis führt.",
      quote:
        "Ein Lächeln entsteht nicht in der Praxis — es entsteht im Leben. Wir geben ihm nur den Rahmen.",
      image: "/images/yann.jpg",
      link: {
        label: "Über das Team",
        linkRef: { kind: "page", slug: "team" },
      },
    }),
    s("MethodTimeline", {
      title: "Fünf Schritte.",
      italicTail: "Ein klarer Weg.",
      intro:
        "Vom Erstgespräch bis zur Nachsorge — Sie wissen jederzeit, wo Sie stehen.",
      steps: [
        { title: "Erstgespräch & Diagnostik", duration: "ca. 60 Min." },
        { title: "Behandlungsplan & Visualisierung", duration: "1 – 2 Wochen" },
        { title: "Aktive Behandlung", duration: "12 – 24 Monate" },
        { title: "Feineinstellung", duration: "2 – 4 Monate" },
        { title: "Retention & Nachsorge", duration: "kontinuierlich" },
      ],
      cta: {
        label: "Termin",
        linkRef: { kind: "page", slug: "termin" },
        subtitle: "Erstgespräch · 60 Minuten · CHF 150 — voll anrechenbar.",
      },
    }),
    s("Testimonials", {
      title: "Stimmen.",
      items: [
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
      ],
    }),
    s("CallToAction", {
      title: "Bereit zu",
      italicTail: "starten?",
      subtitle:
        "Sie wissen, was Sie wollen — wir buchen Ihren Termin. Direkt online oder telefonisch.",
      ctaPrimary: {
        label: "Termin buchen",
        linkRef: { kind: "page", slug: "termin" },
      },
      ctaSecondary: {
        label: "041 210 04 55",
        linkRef: { kind: "external", href: "tel:+41412100455" },
      },
      theme: "dark",
    }),
  ],
};

// ---------------- Team ----------------

const TEAM: Page = {
  seo: {
    title: "Team — Deleurant Kieferorthopädie",
    description:
      "Sechs Menschen mit klaren Rollen — und einer gemeinsamen Handschrift: Qualität bei Wachstum.",
  },
  sections: [
    s("HeroImage", {
      eyebrow: "Das Team",
      title: "Sechs Menschen.",
      italicTail: "Eine Handschrift.",
      subtitle:
        "Yann verantwortet jeden Behandlungsplan. Die Routine begleitet sein erfahrenes Team — diese Aufteilung ist Absicht.",
      image: "/images/yann.jpg",
    }),
    s("TeamGrid", {
      title: "Team",
      members: team.map((m) => ({
        slug: m.slug,
        name: m.name,
        role: m.role,
        standort: m.standort,
        bio: m.bio,
        image: m.image,
      })),
    }),
    s("CallToAction", {
      title: "Lernen Sie uns",
      italicTail: "kennen.",
      subtitle:
        "Buchen Sie ein Erstgespräch — 60 Minuten, CHF 150, bei Behandlungsbeginn voll anrechenbar.",
      ctaPrimary: {
        label: "Termin buchen",
        linkRef: { kind: "page", slug: "termin" },
      },
      theme: "dark",
    }),
  ],
};

// ---------------- Termin ----------------

const TERMIN: Page = {
  seo: {
    title: "Termin buchen — Deleurant Kieferorthopädie",
    description:
      "Erstgespräch, 60 Minuten, CHF 150 — bei Behandlungsbeginn voll anrechenbar. Online buchen oder telefonisch melden.",
  },
  sections: [
    s("HeroImage", {
      eyebrow: "Termin",
      title: "Ihr nächster",
      italicTail: "Schritt.",
      subtitle:
        "Erstgespräch — 60 Minuten, CHF 150, bei Behandlungsbeginn voll anrechenbar. Direkt online oder telefonisch.",
      image: "/images/home.jpg",
    }),
    s("ContactStrip", {
      mode: "phone",
      title: "Lieber",
      italicTail: "telefonisch?",
      intro: "Eine Nummer — drei Standorte.",
      items: [
        {
          label: "Zentrale",
          value: "041 210 04 55",
          href: "tel:+41412100455",
          detail: "Mo – Fr · 08:00 – 17:00",
        },
      ],
    }),
    s("TerminForm", {
      introTitle: "Online buchen",
      introBody:
        "Drei Standorte, ein Formular. Wir melden uns innert 24 Stunden mit konkreten Terminvorschlägen.",
    }),
    s("CallToAction", {
      title: "Noch unsicher,",
      italicTail: "was passt?",
      subtitle:
        "Im Erstgespräch klären wir gemeinsam, welche Behandlung zu Ihnen passt — ohne Verpflichtung.",
      ctaPrimary: {
        label: "Ratgeber lesen",
        linkRef: { kind: "page", slug: "ratgeber" },
      },
      theme: "outline",
    }),
  ],
};

// ---------------- Arbeitgeber ----------------

const ARBEITGEBER: Page = {
  seo: {
    title: "Karriere bei Deleurant — Kieferorthopädie als Arbeitgeber",
    description:
      "Sechs gute Gründe, in unserer Praxis zu arbeiten — und alle offenen Stellen an drei Standorten in der Zentralschweiz.",
  },
  sections: [
    s("HeroImage", {
      eyebrow: "Arbeiten bei uns",
      title: "Eine Praxis,",
      italicTail: "drei Standorte.",
      subtitle:
        "Kieferorthopädie auf hohem Niveau — mit klaren Strukturen, Weiterbildung als Arbeitszeit und einer flachen Hierarchie.",
      image: "/images/sursee1.jpg",
    }),
    s("BenefitsGrid", {
      title: "Sechs Gründe.",
      italicTail: "",
      items: benefits,
    }),
    s("JobsList", {
      title: "Offene Stellen",
      intro:
        "Initiativbewerbungen sind willkommen — wir suchen Menschen, nicht nur Funktionen.",
      items: jobs,
    }),
    s("CallToAction", {
      title: "Initiativ",
      italicTail: "bewerben?",
      subtitle:
        "Schicken Sie uns ein paar Zeilen zu Ihrer Motivation und Ihrem Lebenslauf — wir melden uns persönlich.",
      ctaPrimary: {
        label: "E-Mail schreiben",
        linkRef: { kind: "external", href: "mailto:karriere@deleurant.ch" },
      },
      theme: "dark",
    }),
  ],
};

// ---------------- Ratgeber Index ----------------

const RATGEBER: Page = {
  seo: {
    title: "Ratgeber — Deleurant Kieferorthopädie",
    description:
      "Was Sie über Zahnspange, Kieferorthopädie und Invisalign wissen sollten — vor dem ersten Termin.",
  },
  sections: [
    s("HeroImage", {
      eyebrow: "Ratgeber",
      title: "Drei Themen.",
      italicTail: "Klar erklärt.",
      subtitle:
        "Vor dem ersten Termin lohnt sich ein Blick auf die wichtigsten Fragen.",
      image: "/images/festsitzend-photo.jpg",
    }),
    s("PillarsGrid", {
      title: "Die wichtigsten",
      italicTail: "Themen.",
      intro: "Drei Ratgeber, sortiert nach Häufigkeit der Fragen im Erstgespräch.",
      items: pillars.map((p) => ({
        linkRef: { kind: "pillar", slug: p.slug },
        title: p.title,
        tagline: p.tagline,
      })),
    }),
    s("CallToAction", {
      title: "Bereit für ein",
      italicTail: "Gespräch?",
      subtitle:
        "Die persönliche Beratung ersetzt keinen Ratgeber — der Ratgeber ersetzt keine Beratung.",
      ctaPrimary: {
        label: "Termin buchen",
        linkRef: { kind: "page", slug: "termin" },
      },
      theme: "dark",
    }),
  ],
};

// ---------------- Standorte ----------------

const standorteItems: CollectionItem[] = locations.map((loc) => {
  const others = locations.filter((l) => l.slug !== loc.slug);
  return {
    slug: loc.slug,
    seo: {
      title: `${loc.name} — Deleurant Kieferorthopädie`,
      description: loc.intro,
    },
    sections: [
      s("HeroImage", {
        eyebrow: "Standort",
        title: loc.name,
        italicTail: "",
        subtitle: loc.intro,
        image: loc.image,
        badge: loc.badge,
        meta: [
          { label: "Adresse", value: `${loc.street} · ${loc.zip}` },
          { label: "Telefon", value: loc.phone },
          { label: "E-Mail", value: loc.email },
        ],
      }),
      s("LocationDetail", {
        description: loc.description,
        address: {
          street: loc.street,
          zip: loc.zip,
          phone: loc.phone,
          email: loc.email,
        },
        hours: loc.hours,
        transit: loc.transit,
      }),
      s("MapEmbed", {
        query: `${loc.street}, ${loc.zip}`,
        aspect: "21/9",
      }),
      ...(others.length > 0
        ? [
            s("LocationsTeaser", {
              title: "Die anderen",
              italicTail: "Standorte.",
              items: others.map((o) => ({
                linkRef: { kind: "location" as const, slug: o.slug },
                name: o.name,
                address: o.street,
                zip: o.zip,
                image: o.image,
                badge: o.badge,
              })),
            }),
          ]
        : []),
      s("CallToAction", {
        title: "Termin am",
        italicTail: `Standort ${loc.name}.`,
        subtitle:
          "Erstgespräch — 60 Minuten, CHF 150, bei Behandlungsbeginn voll anrechenbar.",
        ctaPrimary: {
          label: "Termin buchen",
          linkRef: { kind: "page", slug: "termin" },
        },
        ctaSecondary: {
          label: loc.phone.replace("+41 ", "0").replace(/\s/g, " "),
          linkRef: {
            kind: "external",
            href: `tel:${loc.phone.replace(/[^+\d]/g, "")}`,
          },
        },
        theme: "dark",
      }),
    ],
  };
});

// ---------------- Behandlungen ----------------

const behandlungenItems: CollectionItem[] = treatments.map((t) => {
  const others = treatments.filter((x) => x.slug !== t.slug);
  return {
    slug: t.slug,
    seo: {
      title: `${t.title} — Deleurant Kieferorthopädie`,
      description: t.description,
    },
    sections: [
      s("HeroImage", {
        eyebrow: t.eyebrow,
        title: t.title,
        italicTail: "",
        subtitle: t.tagline,
        image: t.photo,
        meta: [
          { label: "Ab", value: t.priceFrom },
          { label: "Dauer", value: t.duration },
          { label: "Methode", value: t.accent },
        ],
      }),
      s("TreatmentDetail", {
        intro: t.intro,
        long: t.long,
        benefits: t.benefits,
        forWhom: t.forWhom,
        priceFrom: t.priceFrom,
        duration: t.duration,
        accent: t.accent,
      }),
      ...(t.beforeAfter && t.beforeAfter.length > 0
        ? [
            s("BeforeAfterSlider", {
              title: "Vorher.",
              italicTail: "Nachher.",
              intro:
                "Echte Behandlungsverläufe aus unserer Praxis. Mit dem Schieber wechseln Sie zwischen Vorher und Nachher.",
              pairs: t.beforeAfter.map((p) => ({ ...p })),
              theme: "dark",
            }),
          ]
        : []),
      s("FAQ", {
        title: "Häufige",
        italicTail: "Fragen.",
        items: t.faq,
        jsonLd: true,
      }),
      s("CallToAction", {
        title: `Ist ${t.title} das`,
        italicTail: "Richtige?",
        subtitle:
          "Im Erstgespräch klären wir, ob diese Methode zu Ihrem Befund passt — und welche Alternativen es gibt.",
        ctaPrimary: {
          label: "Termin buchen",
          linkRef: { kind: "page", slug: "termin" },
        },
        theme: "dark",
      }),
      ...(others.length > 0
        ? [
            s("TreatmentsTeaser", {
              title: "Weitere",
              italicTail: "Methoden.",
              items: others.map((o) => ({
                title: o.title,
                tagline: o.tagline,
                photo: o.photo,
                linkRef: { kind: "treatment" as const, slug: o.slug },
              })),
            }),
          ]
        : []),
    ],
  };
});

// ---------------- Ratgeber Pillars ----------------

function pillarToRichTextHtml(p: typeof pillars[number]): string {
  const parts: string[] = [];
  parts.push(`<p><strong>${escapeHtml(p.answer)}</strong></p>`);
  parts.push(`<p>${escapeHtml(p.intro)}</p>`);
  for (const sec of p.sections) {
    parts.push(`<h2>${escapeHtml(sec.heading)}</h2>`);
    parts.push(`<p>${escapeHtml(sec.body)}</p>`);
  }
  return parts.join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const ratgeberItems: CollectionItem[] = pillars.map((p) => ({
  slug: p.slug,
  seo: {
    title: `${p.title} — Ratgeber Deleurant`,
    description: p.tagline,
  },
  sections: [
    s("HeroImage", {
      eyebrow: "Ratgeber",
      title: p.title,
      italicTail: "",
      subtitle: p.tagline,
      image: "/images/festsitzend-photo.jpg",
    }),
    s("RichText", {
      html: pillarToRichTextHtml(p),
    }),
    s("FAQ", {
      title: "Häufige",
      italicTail: "Fragen.",
      items: p.faq,
      jsonLd: true,
    }),
    s("CallToAction", {
      title: "Persönliche",
      italicTail: "Beratung.",
      subtitle:
        "Der Ratgeber ersetzt keine Beratung. Im Erstgespräch klären wir Ihre individuelle Situation.",
      ctaPrimary: {
        label: "Termin buchen",
        linkRef: { kind: "page", slug: "termin" },
      },
      theme: "dark",
    }),
  ],
}));

// ---------------- Compose & write ----------------

const content: LocaleContent = {
  seo: {
    title: "Deleurant — Kieferorthopädie",
    description:
      "Spezialpraxis für Kieferorthopädie. Drei Standorte in der Zentralschweiz.",
    ogTitle: "Deleurant — Kieferorthopädie",
    ogDescription:
      "Spezialpraxis für Kieferorthopädie. Drei Standorte in der Zentralschweiz.",
    ogImage: "/images/start.jpg",
    keywords:
      "Kieferorthopädie, Zahnspange, Invisalign, Luzern, Sursee, Küssnacht, Deleurant",
  },
  pages: {
    home: HOME,
    team: TEAM,
    termin: TERMIN,
    arbeitgeber: ARBEITGEBER,
    ratgeber: RATGEBER,
  },
  collections: {
    standorte: standorteItems,
    behandlungen: behandlungenItems,
    ratgeber: ratgeberItems,
  },
};

async function main() {
  const outPath = path.join(process.cwd(), "messages", "de.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(content, null, 2) + "\n", "utf-8");
  console.log(`✅ Wrote ${outPath}`);
  console.log(`   pages: ${Object.keys(content.pages).length}`);
  console.log(
    `   collections: standorte=${standorteItems.length} behandlungen=${behandlungenItems.length} ratgeber=${ratgeberItems.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
