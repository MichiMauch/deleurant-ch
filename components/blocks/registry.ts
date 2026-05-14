import type { BlockType, BlockDataMap, Section } from "@/types/content";

function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const BLOCK_LABELS: Record<BlockType, string> = {
  HeroVideo: "Hero (Video)",
  HeroImage: "Hero (Bild)",
  WishesGrid: "Wunsch-Grid",
  TreatmentsTeaser: "Behandlungs-Teaser",
  LocationsTeaser: "Standort-Teaser",
  TrustStrip: "Trust-Strip",
  MethodTimeline: "Methoden-Timeline",
  Testimonials: "Stimmen",
  BeforeAfterSlider: "Vorher/Nachher",
  FAQ: "FAQ",
  RichText: "Freier Text",
  PillarsGrid: "Ratgeber-Karten",
  TeamGrid: "Team-Grid",
  DoctorSpotlight: "Doctor-Spotlight",
  BenefitsGrid: "Benefits-Grid",
  JobsList: "Stellen-Liste",
  LocationDetail: "Standort-Detail",
  MapEmbed: "Karte",
  TreatmentDetail: "Behandlungs-Detail",
  ContactStrip: "Kontakt-Strip",
  TerminForm: "Termin-Formular",
  CallToAction: "Call-to-Action",
};

export const BLOCK_DESCRIPTIONS: Record<BlockType, string> = {
  HeroVideo: "Vollflächiger Hero mit Hintergrund-Video.",
  HeroImage: "Hero mit Hintergrundbild und Meta-Liste.",
  WishesGrid: "Wunsch-Karten — Eltern, Erwachsene, Beide.",
  TreatmentsTeaser: "Methoden-Grid mit Foto, Titel, Tagline.",
  LocationsTeaser: "Standort-Karten mit Adresse und Badge.",
  TrustStrip: "Vier KPIs am Stück, dezent.",
  MethodTimeline: "Fünf-Schritt-Timeline mit inline CTA.",
  Testimonials: "Drei-Spalter-Zitate.",
  BeforeAfterSlider: "Interaktiver Vorher/Nachher-Slider.",
  FAQ: "Aufklappbare Fragen mit optionalem JSON-LD.",
  RichText: "Editierbarer Fliesstext (Tiptap).",
  PillarsGrid: "Ratgeber-Karten — Themen-Übersicht.",
  TeamGrid: "Team-Mitglieder als Liste/Grid.",
  DoctorSpotlight: "Bildhalbseite mit Zitat und Bio.",
  BenefitsGrid: "Vorteile-Grid (z.B. Arbeitgeber).",
  JobsList: "Offene Stellen als Liste.",
  LocationDetail: "Adresse, Öffnungszeiten, Anreise.",
  MapEmbed: "Eingebettete Karte (OSM).",
  TreatmentDetail: "Lange Beschreibung + Benefits + Indikation.",
  ContactStrip: "Telefon/WhatsApp-Anschluss.",
  TerminForm: "Termin-Buchungsformular.",
  CallToAction: "Dunkler Banner mit ein bis zwei CTAs.",
};

export function createDefaultBlock<T extends BlockType>(type: T): Section {
  const id = uuid();
  const data = DEFAULT_DATA[type];
  return { id, type, data: structuredClone(data) } as Section;
}

const DEFAULT_DATA: { [K in BlockType]: BlockDataMap[K] } = {
  HeroVideo: {
    headline: "Neuer Titel.<br><em>Italic-Tail.</em>",
    subtitle: "Untertitel — beschreibt das Angebot in einem Satz.",
    video: "/media/hero.mp4",
    poster: "/images/start.jpg",
    ctaPrimary: { label: "Termin buchen", linkRef: { kind: "page", slug: "termin" } },
    ctaSecondary: {
      label: "Mehr erfahren",
      linkRef: { kind: "external", href: "#" },
    },
  },
  HeroImage: {
    eyebrow: "Eyebrow",
    headline: "Neuer Titel",
    subtitle: "Untertitel in einem Satz.",
    image: "/images/home.jpg",
  },
  WishesGrid: {
    eyebrow: "Ihr Ausgangspunkt",
    headline: "Was möchten Sie<br><em>erreichen?</em>",
    intro: "Wählen Sie Ihren Ausgangspunkt.",
    items: [
      {
        number: "01",
        title: "Neuer Wunsch",
        audience: "Beide",
        answer: "Antwort in einem Satz.",
        linkRef: { kind: "page", slug: "termin" },
      },
    ],
  },
  TreatmentsTeaser: {
    items: [
      {
        title: "Methode",
        tagline: "Tagline.",
        photo: "/images/festsitzend-photo.jpg",
        linkRef: { kind: "treatment", slug: "festsitzend" },
      },
    ],
  },
  LocationsTeaser: {
    headline: "Standorte. <em>In Ihrer Nähe.</em>",
    items: [
      {
        linkRef: { kind: "location", slug: "luzern" },
        name: "Luzern",
        address: "Theaterstrasse 5",
        zip: "6003 Luzern",
        image: "/images/home.jpg",
      },
    ],
  },
  TrustStrip: {
    items: [{ kpi: "KPI", label: "Beschreibung" }],
  },
  MethodTimeline: {
    headline: "Schritte.<br><em>Ein klarer Weg.</em>",
    intro: "Vom Erstgespräch bis zur Nachsorge.",
    steps: [{ title: "Schritt 1", duration: "ca. 60 Min." }],
  },
  Testimonials: {
    headline: "Stimmen.",
    items: [{ quote: "Zitat.", name: "Name", treatment: "Behandlung" }],
  },
  BeforeAfterSlider: {
    headline: "Vorher.<br><em>Nachher.</em>",
    intro: "Beispiel.",
    pairs: [
      {
        before: "/images/ba1-vorher.jpg",
        after: "/images/ba1-nachher.jpg",
        duration: "20 Monate",
      },
    ],
    theme: "dark",
  },
  FAQ: {
    headline: "Häufige<br><em>Fragen.</em>",
    items: [{ q: "Frage?", a: "Antwort." }],
    jsonLd: true,
  },
  RichText: {
    html: "<p>Neuer Text.</p>",
  },
  PillarsGrid: {
    headline: "Themen.<br><em>Klar erklärt.</em>",
    intro: "Übersicht.",
    items: [
      {
        linkRef: { kind: "pillar", slug: "zahnspange" },
        title: "Thema",
        tagline: "Tagline.",
      },
    ],
  },
  TeamGrid: {
    headline: "Team",
    members: [
      {
        slug: "neu",
        name: "Vorname Nachname",
        role: "Rolle",
        standort: "Standort",
        bio: "Kurze Bio.",
      },
    ],
  },
  DoctorSpotlight: {
    eyebrow: "Praxisinhaber",
    headline: "Dr. med. dent.<br><em>Vorname Nachname</em>",
    credentials: "Fachzahnarzt SSO",
    body: "Kurzbeschreibung.",
    quote: "Ein Zitat.",
    image: "/images/yann.jpg",
  },
  BenefitsGrid: {
    headline: "Sechs Gründe.",
    items: [{ title: "Titel", body: "Beschreibung." }],
  },
  JobsList: {
    headline: "Offene Stellen",
    items: [
      {
        slug: "neue-stelle",
        title: "Stellentitel",
        pensum: "100 %",
        standort: "Luzern",
        start: "Nach Vereinbarung",
        summary: "Kurze Beschreibung der Stelle.",
      },
    ],
  },
  LocationDetail: {
    description: "Beschreibung.",
    address: {
      street: "Strasse",
      zip: "PLZ Ort",
      phone: "+41 ...",
      email: "info@example.ch",
    },
    hours: [{ label: "Mo – Fr", value: "08:00 – 17:00" }],
    transit: [{ mode: "Bahn", detail: "..." }],
  },
  MapEmbed: {
    query: "Theaterstrasse 5, 6003 Luzern",
    aspect: "21/9",
  },
  TreatmentDetail: {
    intro: "Intro-Text.",
    long: "Längere Beschreibung.",
    benefits: [{ title: "Vorteil", body: "Beschreibung." }],
    forWhom: ["Zielgruppe"],
    priceFrom: "ab CHF ...",
    duration: "12 – 24 Monate",
    accent: "Methode",
  },
  ContactStrip: {
    mode: "phone",
    headline: "Lieber<br><em>telefonisch?</em>",
    items: [
      {
        label: "Zentrale",
        value: "041 210 04 55",
        href: "tel:+41412100455",
      },
    ],
  },
  TerminForm: {
    introTitle: "Online buchen",
    introBody: "Wir melden uns innert 24 Stunden.",
  },
  CallToAction: {
    headline: "Bereit zu<br><em>starten?</em>",
    subtitle: "Buchen Sie ein Erstgespräch.",
    ctaPrimary: {
      label: "Termin buchen",
      linkRef: { kind: "page", slug: "termin" },
    },
    theme: "dark",
  },
};
