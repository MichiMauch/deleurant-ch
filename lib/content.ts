export type LocationSlug = "luzern" | "sursee" | "kuessnacht";

export type Location = {
  slug: LocationSlug;
  name: string;
  street: string;
  zip: string;
  email: string;
  phone: string;
  image: string;
  badge?: string;
  intro: string;
  description: string;
  hours: { label: string; value: string }[];
  transit: { mode: string; detail: string }[];
};

export const locations: Location[] = [
  {
    slug: "luzern",
    name: "Luzern",
    street: "Theaterstrasse 5",
    zip: "6003 Luzern",
    email: "luzern@deleurant.ch",
    phone: "+41 41 210 04 55",
    image: "/images/home.jpg",
    intro: "Im Herzen der Stadt — seit über zwei Jahrzehnten.",
    description:
      "Unser Hauptsitz an der Theaterstrasse vereint moderne Behandlungsräume mit der Atmosphäre eines klassischen Luzerner Stadthauses. Drei Schritte vom Bahnhof, fünf Minuten zur Altstadt.",
    hours: [
      { label: "Mo – Do", value: "08:00 – 12:30 · 13:30 – 17:00" },
      { label: "Freitag", value: "08:00 – 12:30 · 13:30 – 16:00" },
      { label: "Samstag", value: "Geschlossen" },
    ],
    transit: [
      { mode: "Bahn", detail: "5 Min. Fussweg vom Bahnhof Luzern" },
      { mode: "Bus", detail: "Linie 1, 4, 7 — Haltestelle Theater" },
      { mode: "Parking", detail: "Parkhaus Altstadt, 2 Min. Fussweg" },
    ],
  },
  {
    slug: "sursee",
    name: "Sursee",
    street: "Christoph-Schnyder-Strasse 2a",
    zip: "6210 Sursee",
    email: "sursee@deleurant.ch",
    phone: "+41 41 210 04 55",
    image: "/images/sursee1.jpg",
    intro: "Modern, ruhig — und perfekt erreichbar.",
    description:
      "Unsere Praxis in Sursee bietet auf grosszügigen Räumen das gleiche Behandlungsspektrum wie in Luzern. Eigener Parkplatz direkt vor der Tür, ideale Anbindung an Sempachersee und Oberes Wiggertal.",
    hours: [
      { label: "Mo – Do", value: "08:00 – 12:30 · 13:30 – 17:00" },
      { label: "Freitag", value: "08:00 – 12:30 · 13:30 – 16:00" },
      { label: "Samstag", value: "Geschlossen" },
    ],
    transit: [
      { mode: "Bahn", detail: "8 Min. Fussweg vom Bahnhof Sursee" },
      { mode: "Auto", detail: "Eigener Patientenparkplatz vor dem Haus" },
      { mode: "A2", detail: "5 Min. von der Autobahn-Ausfahrt Sursee" },
    ],
  },
  {
    slug: "kuessnacht",
    name: "Küssnacht",
    street: "Bahnhofstrasse 15",
    zip: "6403 Küssnacht am Rigi",
    email: "kuessnacht@deleurant.ch",
    phone: "+41 41 210 04 55",
    image: "/images/sursee2.jpg",
    badge: "Neu · August 2026",
    intro: "Unser dritter Standort am Fusse der Rigi.",
    description:
      "Im August 2026 eröffnen wir an der Bahnhofstrasse 15 in Küssnacht am Rigi. Auf zwei Etagen entstehen vier Behandlungsräume — die gleiche Praxisphilosophie, die gleiche Handschrift, näher bei Ihnen.",
    hours: [
      { label: "Eröffnung", value: "August 2026" },
      { label: "Voranmeldung", value: "ab Mai 2026 möglich" },
    ],
    transit: [
      { mode: "Bahn", detail: "2 Min. Fussweg vom Bahnhof Küssnacht" },
      { mode: "Schiff", detail: "10 Min. von der Schiffstation" },
      { mode: "Auto", detail: "Parkmöglichkeiten in der Umgebung" },
    ],
  },
];

export type TreatmentSlug = "festsitzend" | "abnehmbar" | "unsichtbar";

export type Treatment = {
  slug: TreatmentSlug;
  eyebrow: string;
  title: string;
  tagline: string;
  accent: string;
  priceFrom: string;
  duration: string;
  description: string;
  photo: string;
  icon: string;
  intro: string;
  long: string;
  benefits: { title: string; body: string }[];
  forWhom: string[];
  faq: { q: string; a: string }[];
  beforeAfter?: { before: string; after: string; duration: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "festsitzend",
    eyebrow: "01",
    title: "Festsitzend",
    tagline: "Brackets und Lingualtechnik.",
    accent: "Brackets · Lingual",
    priceFrom: "ab CHF 4'500",
    duration: "12 – 24 Monate",
    description:
      "Brackets in Metall oder Keramik, ergänzt durch die unsichtbare Lingualtechnik. Präzise, vorhersehbar, dauerhaft.",
    photo: "/images/festsitzend-photo.jpg",
    icon: "/images/festsitzend.png",
    intro:
      "Die klassische festsitzende Apparatur bleibt die präziseste Methode der Kieferorthopädie — heute moderner und diskreter denn je.",
    long:
      "Festsitzende Apparaturen bestehen aus kleinen Plättchen (Brackets), die auf die Zähne geklebt und durch einen Drahtbogen verbunden werden. Wir bieten Metall- und Keramikbrackets sowie die unsichtbare Lingualtechnik, bei der die Brackets auf der Zahninnenseite angebracht werden.",
    benefits: [
      {
        title: "Höchste Präzision",
        body: "Auch komplexe Fehlstellungen lassen sich vorhersehbar korrigieren.",
      },
      {
        title: "Permanente Wirkung",
        body: "24/7 aktiv — keine Tragedisziplin notwendig.",
      },
      {
        title: "Diskrete Varianten",
        body: "Keramikbrackets und Lingualtechnik für anspruchsvolle Erwachsene.",
      },
    ],
    forWhom: [
      "Jugendliche mit ausgeprägten Zahnfehlstellungen",
      "Erwachsene mit komplexen kieferorthopädischen Befunden",
      "Patient:innen, die maximale Vorhersagbarkeit wünschen",
    ],
    faq: [
      {
        q: "Wie lange dauert die Behandlung?",
        a: "In der Regel zwischen 12 und 24 Monaten — abhängig von der Ausgangssituation.",
      },
      {
        q: "Sind die Brackets sichtbar?",
        a: "Metallbrackets sind klein und unauffällig. Keramikbrackets passen sich der Zahnfarbe an. Lingualbrackets sind von aussen nicht sichtbar.",
      },
      {
        q: "Werden die Kosten von der Krankenkasse übernommen?",
        a: "Bei medizinischer Indikation können IV-Leistungen geltend gemacht werden. Wir beraten Sie gerne dazu.",
      },
    ],
    beforeAfter: [
      {
        before: "/images/ba1-vorher.jpg",
        after: "/images/ba1-nachher.jpg",
        duration: "20 Monate",
      },
      {
        before: "/images/ba2-vorher.jpg",
        after: "/images/ba2-nachher.jpg",
        duration: "18 Monate",
      },
    ],
  },
  {
    slug: "abnehmbar",
    eyebrow: "02",
    title: "Abnehmbar",
    tagline: "Für das wachsende Kiefer.",
    accent: "Wachstum · Nacht",
    priceFrom: "ab CHF 1'800",
    duration: "6 – 18 Monate",
    description:
      "Apparaturen für die Nacht und das wachsende Kiefer. Sanft begleitet, achtsam geführt.",
    photo: "/images/abnehmbar-photo.jpg",
    icon: "/images/abnehmbar.png",
    intro:
      "Abnehmbare Apparaturen nutzen das natürliche Wachstum — die schonendste Form der frühzeitigen Kieferorthopädie für Kinder.",
    long:
      "Bei abnehmbaren Apparaturen lenken wir das Kieferwachstum in die richtige Richtung, ohne in die volle Zahnreihe einzugreifen. Häufig nur über Nacht und einige Stunden tagsüber getragen, sind sie ideal für die Frühbehandlung.",
    benefits: [
      {
        title: "Sanfte Korrektur",
        body: "Nutzung der natürlichen Wachstumsphase.",
      },
      {
        title: "Hohe Hygiene",
        body: "Zum Essen und Zähneputzen einfach herausnehmbar.",
      },
      {
        title: "Geringer Aufwand",
        body: "Oft genügt das Tragen über Nacht.",
      },
    ],
    forWhom: [
      "Kinder im Wachstum (6 – 12 Jahre)",
      "Frühbehandlung von Kreuzbiss, Engstand oder Distalbiss",
      "Familien, die eine sanfte Erstmassnahme suchen",
    ],
    faq: [
      {
        q: "Wann ist der richtige Zeitpunkt für eine Frühbehandlung?",
        a: "Wir empfehlen eine erste kieferorthopädische Kontrolle im Alter von 7 – 8 Jahren.",
      },
      {
        q: "Was, wenn das Kind die Apparatur nicht tragen will?",
        a: "Wir nehmen uns Zeit, das Kind zu erklären — und arbeiten eng mit den Eltern. Die Tragedisziplin entscheidet über den Erfolg.",
      },
      {
        q: "Genügt eine abnehmbare Apparatur immer?",
        a: "Nicht in allen Fällen. Oft folgt nach der Wachstumsphase eine festsitzende Behandlung. Wir planen den Gesamtweg von Anfang an.",
      },
    ],
  },
  {
    slug: "unsichtbar",
    eyebrow: "03",
    title: "Unsichtbar",
    tagline: "Aligner. Diskret durch den Alltag.",
    accent: "Aligner · Invisalign",
    priceFrom: "ab CHF 5'200",
    duration: "10 – 18 Monate",
    description:
      "Transparente Aligner für Erwachsene, die ihre Behandlung diskret durch den Alltag tragen möchten.",
    photo: "/images/unsichtbar-photo.jpg",
    icon: "/images/unsichtbar.png",
    intro:
      "Transparente Aligner-Schienen — die unsichtbare Alternative zur festsitzenden Zahnspange für Erwachsene.",
    long:
      "Mit Invisalign und vergleichbaren Aligner-Systemen tragen Sie alle ein bis zwei Wochen eine neue, individuell gefertigte Schiene. Die Bewegungen sind millimetergenau am Computer geplant — Sie sehen das Endergebnis bereits vor Beginn.",
    benefits: [
      {
        title: "Praktisch unsichtbar",
        body: "Selbst aus der Nähe kaum wahrnehmbar.",
      },
      {
        title: "Herausnehmbar",
        body: "Zum Essen, Putzen oder besonderen Anlässen.",
      },
      {
        title: "Visualisierung",
        body: "Sie sehen das Endergebnis vor dem ersten Schritt.",
      },
    ],
    forWhom: [
      "Erwachsene mit leichten bis mittelschweren Fehlstellungen",
      "Berufstätige, die eine sichtbare Spange vermeiden möchten",
      "Patient:innen, die hohe Eigendisziplin mitbringen",
    ],
    faq: [
      {
        q: "Wie lange muss ich die Aligner pro Tag tragen?",
        a: "Mindestens 20 – 22 Stunden täglich — nur zum Essen und Zähneputzen herausnehmen.",
      },
      {
        q: "Sind Aligner für jeden geeignet?",
        a: "Nicht in allen Fällen. Bei komplexen Befunden ist die festsitzende Therapie überlegen. Im Erstgespräch klären wir, was für Sie passt.",
      },
      {
        q: "Bekomme ich das Ergebnis im Voraus zu sehen?",
        a: "Ja. Vor Behandlungsbeginn zeigen wir Ihnen eine 3D-Visualisierung des erwarteten Endergebnisses.",
      },
    ],
    beforeAfter: [
      {
        before: "/images/ba3-vorher.jpg",
        after: "/images/ba3-nachher.jpg",
        duration: "14 Monate",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}
