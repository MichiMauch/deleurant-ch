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

export type Wish = {
  slug: string;
  number: string;
  title: string;
  audience: string;
  answer: string;
  href: string;
};

export const wishes: Wish[] = [
  {
    slug: "kind",
    number: "01",
    title: "Zahnkorrektur für mein Kind",
    audience: "Eltern",
    answer: "Abnehmbar oder festsitzend — je nach Alter und Befund.",
    href: "/behandlungen/abnehmbar",
  },
  {
    slug: "unsichtbar",
    number: "02",
    title: "Ich will es unsichtbar",
    audience: "Erwachsene",
    answer: "Invisalign oder Lingual — je nach Diagnose.",
    href: "/behandlungen/unsichtbar",
  },
  {
    slug: "schnell",
    number: "03",
    title: "Schnellstes Ergebnis",
    audience: "Beide",
    answer: "Festsitzend bleibt die schnellste Methode.",
    href: "/behandlungen/festsitzend",
  },
  {
    slug: "diskret",
    number: "04",
    title: "Erwachsen, diskret",
    audience: "Erwachsene",
    answer: "Lingual oder Invisalign — diskret im Alltag.",
    href: "/behandlungen/unsichtbar",
  },
  {
    slug: "preis",
    number: "05",
    title: "Preisgünstigster Weg",
    audience: "Beide",
    answer: "Abnehmbar, wenn medizinisch sinnvoll.",
    href: "/behandlungen/abnehmbar",
  },
  {
    slug: "zweitmeinung",
    number: "06",
    title: "Zweitmeinung",
    audience: "Beide",
    answer: "Erstuntersuchung CHF 150 — voll anrechenbar.",
    href: "/termin",
  },
];

export type Pillar = {
  slug: string;
  title: string;
  tagline: string;
  answer: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const pillars: Pillar[] = [
  {
    slug: "zahnspange",
    title: "Zahnspange",
    tagline: "Alles, was man vor einer Behandlung wissen sollte.",
    answer:
      "Eine Zahnspange ist eine kieferorthopädische Apparatur, die Zähne und Kiefer in eine korrekte Position bewegt. Es gibt feste Spangen (Brackets, Lingual), abnehmbare Geräte (für das wachsende Kiefer) und Aligner-Schienen (Invisalign). Die Wahl hängt vom Alter, dem Befund und dem persönlichen Anspruch ab.",
    intro:
      "Die Frage «Welche Spange ist die richtige?» hat keine pauschale Antwort. Sie hängt von Anatomie, Alter, Alltag und Erwartung ab. Diese Seite ordnet die wichtigsten Varianten und nennt für jede die typische Indikation.",
    sections: [
      {
        heading: "Feste Spange",
        body: "Brackets in Metall oder Keramik sind die präziseste Methode — auch bei komplexen Fehlstellungen. Sie wirken 24/7, ohne Mitwirkung des Patienten. Lingual-Brackets werden auf der Zahninnenseite befestigt und sind von aussen nicht sichtbar.",
      },
      {
        heading: "Abnehmbare Spange",
        body: "Wachstumslenkung beim Kind: oft nur über Nacht getragen. Schont die volle Zahnreihe, ideal für Frühbehandlungen im Alter von 7–12 Jahren.",
      },
      {
        heading: "Aligner (Invisalign)",
        body: "Transparente Schienen, alle 1–2 Wochen gewechselt. Praktisch unsichtbar, herausnehmbar zum Essen und Putzen. Mindestens 20–22 Stunden Tragezeit am Tag.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Zahnspange in der Schweiz?",
        a: "Abnehmbar ab CHF 1'800, festsitzend ab CHF 4'500, Invisalign ab CHF 5'200. Bei medizinischer Indikation können IV-Leistungen geltend gemacht werden.",
      },
      {
        q: "Wie lange dauert eine Behandlung?",
        a: "Im Schnitt 12–24 Monate bei Erwachsenen, 6–18 Monate bei abnehmbarer Frühbehandlung.",
      },
      {
        q: "Tut eine Zahnspange weh?",
        a: "In den ersten Tagen nach Anpassung leichter Druck — danach gewöhnt sich der Mund. Wir besprechen, was zu erwarten ist.",
      },
    ],
  },
  {
    slug: "kieferorthopaedie",
    title: "Kieferorthopädie",
    tagline: "Was hinter dem Fachgebiet steht.",
    answer:
      "Kieferorthopädie ist das medizinische Fachgebiet, das Fehlstellungen von Zähnen und Kiefern diagnostiziert und korrigiert. Eine kieferorthopädische Behandlung verbessert die Funktion (Kauen, Sprechen, Atmen) und die Ästhetik. In der Schweiz ist der Titel «Fachzahnarzt für Kieferorthopädie SSO» nach einer drei- bis vierjährigen Weiterbildung geschützt.",
    intro:
      "Kieferorthopädie ist nicht nur Ästhetik. Sie korrigiert funktionelle Probleme — Bissfehlstellungen, Engstände, Kreuzbisse — die ohne Behandlung lebenslang Folgen haben. Diese Seite erklärt, wann eine Behandlung sinnvoll ist und wer sie durchführen darf.",
    sections: [
      {
        heading: "Wann ist eine Behandlung indiziert?",
        body: "Bei Engstand, Lückenstand, Kreuzbiss, Tiefbiss, Offenbiss oder Distalbiss. Funktionelle Auswirkungen reichen von erhöhter Kariesanfälligkeit bis zu Kiefergelenksbeschwerden. Erste Kontrolle: 7–8 Jahre.",
      },
      {
        heading: "Fachzahnarzt vs. Allgemeinzahnarzt",
        body: "Allgemeinzahnärzte dürfen einfache kieferorthopädische Behandlungen durchführen. Komplexe Befunde gehören in die Hände eines Fachzahnarztes — die zusätzliche Weiterbildung ist dreieinhalb bis vier Jahre.",
      },
      {
        heading: "Was Krankenkassen bezahlen",
        body: "Grundversicherung übernimmt keine Kosten. Bei IV-Geburtsgebrechen werden Behandlungen unter bestimmten Voraussetzungen vergütet. Zusatzversicherungen für Kinder decken oft 75 % bis zu einem Maximalbetrag.",
      },
    ],
    faq: [
      {
        q: "Ab welchem Alter zum Kieferorthopäden?",
        a: "Erste Kontrolle mit 7–8 Jahren. Frühbehandlungen ab 8 Jahren, Hauptbehandlung meist 11–14 Jahre. Erwachsene jederzeit.",
      },
      {
        q: "Wie finde ich einen guten Kieferorthopäden in Luzern?",
        a: "Achten Sie auf den Titel «Fachzahnarzt SSO», eine moderne digitale Ausstattung, Transparenz beim Kostenvoranschlag und ein klares Behandlungskonzept.",
      },
      {
        q: "Was passiert beim Erstgespräch?",
        a: "60 Minuten: Anamnese, klinische Untersuchung, Aufnahmen, Besprechung der Optionen. Kosten CHF 150 — bei Behandlungsbeginn vollumfänglich anrechenbar.",
      },
    ],
  },
  {
    slug: "invisalign",
    title: "Invisalign",
    tagline: "Aligner — Möglichkeiten und Grenzen.",
    answer:
      "Invisalign ist ein Aligner-System: transparente, herausnehmbare Schienen, die alle 1–2 Wochen gewechselt werden. Es eignet sich für leichte bis mittelschwere Zahnfehlstellungen bei Erwachsenen und disziplinierten Jugendlichen. Mindesttragezeit: 20–22 Stunden täglich. Kosten in der Schweiz: ab CHF 5'200, abhängig von Komplexität und Dauer.",
    intro:
      "Invisalign ist eine echte Alternative zur klassischen Spange — aber nicht für jeden Befund die beste. Hier erfahren Sie, wann Aligner funktionieren, wann nicht, und worauf Sie achten sollten.",
    sections: [
      {
        heading: "Wie Aligner funktionieren",
        body: "Die Bewegungen werden vor Behandlungsbeginn am Computer geplant. Sie sehen eine 3D-Simulation des Endergebnisses, bevor die erste Schiene produziert wird. Im Schnitt 20–40 Schienen, jede 1–2 Wochen.",
      },
      {
        heading: "Wann Invisalign funktioniert",
        body: "Engstand, Lückenstand, leichte Rotationen, leichte Bisskorrekturen. Bei komplexen Fehlstellungen, starken Rotationen oder Auxiliarbedarf bleibt die festsitzende Therapie überlegen.",
      },
      {
        heading: "Tragedisziplin entscheidet",
        body: "Aligner wirken nur, wenn sie getragen werden. Unter 20 Stunden täglich verzögern sich Bewegungen — über 22 Stunden bringt keinen Vorteil. Ehrlichkeit mit sich selbst ist die Voraussetzung.",
      },
    ],
    faq: [
      {
        q: "Was ist der Unterschied zu anderen Alignern?",
        a: "Invisalign ist die meistgenutzte Marke und hat das grösste klinische Datenfundament. Andere Systeme (Spark, ClearCorrect) sind technisch ähnlich, mit kleineren Unterschieden bei Material und Software.",
      },
      {
        q: "Kann ich während der Behandlung normal essen?",
        a: "Ja — die Aligner werden zum Essen und Putzen herausgenommen. Danach 20–22 Stunden am Tag getragen.",
      },
      {
        q: "Bekomme ich das Ergebnis vorab zu sehen?",
        a: "Ja. Vor Behandlungsbeginn zeigen wir eine 3D-Simulation, die das erwartete Endergebnis visualisiert.",
      },
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  standort: string;
  bio?: string;
  image?: string;
};

export const team: TeamMember[] = [
  {
    slug: "yann-deleurant",
    name: "Dr. med. dent. Yann Deleurant",
    role: "Fachzahnarzt für Kieferorthopädie SSO · Praxisinhaber",
    standort: "Luzern · Sursee · Küssnacht",
    bio: "Yann führt die Praxis seit 2012 und ist verantwortlich für jeden Behandlungsplan. Er übernimmt Diagnostik, Planung und Schlüsselphasen — die Routinetermine begleitet sein erfahrenes Team. Diese Aufteilung ist Absicht: Sie sichert Qualität bei Wachstum.",
    image: "/images/yann.jpg",
  },
  {
    slug: "anna-keller",
    name: "Anna Keller",
    role: "Dipl. Dentalhygienikerin HF · Teamleitung Luzern",
    standort: "Luzern",
    bio: "Anna leitet das Team am Hauptsitz seit 2017. Ihr Fokus: präzise Behandlungsführung und reibungslose Abläufe — vom Erstgespräch bis zur Retention.",
  },
  {
    slug: "lara-vogel",
    name: "Lara Vogel",
    role: "Dentalassistentin EFZ · Standortleitung Sursee",
    standort: "Sursee",
    bio: "Lara übernimmt seit 2021 die Standortleitung in Sursee. Sie betreut Kinder und Jugendliche mit besonderem Geduld — die Zustimmung der jungen Patient:innen ist die halbe Behandlung.",
  },
  {
    slug: "marco-zwyssig",
    name: "Marco Zwyssig",
    role: "Dipl. Zahntechniker · Eigenes Labor",
    standort: "Luzern (Labor)",
    bio: "Marco fertigt sämtliche Apparaturen im hauseigenen Labor — abnehmbare Geräte, Retainer, Laborschienen. Kurze Wege bedeuten kurze Wartezeiten für unsere Patient:innen.",
  },
  {
    slug: "nadine-bucher",
    name: "Nadine Bucher",
    role: "Empfang & Patientenkoordination",
    standort: "Luzern",
    bio: "Nadine ist meistens die erste Stimme, wenn Sie anrufen. Sie koordiniert Termine standortübergreifend und sorgt dafür, dass keine Anfrage unbeantwortet bleibt.",
  },
  {
    slug: "rahel-koch",
    name: "Rahel Koch",
    role: "Dentalassistentin EFZ in Ausbildung",
    standort: "Luzern",
    bio: "Rahel ist im zweiten Lehrjahr und rotiert zwischen Luzern und Sursee. Bei uns lernen wir aus — Nachwuchs ist Teil der Praxisphilosophie.",
  },
];

export type Benefit = { title: string; body: string };
export const benefits: Benefit[] = [
  {
    title: "Drei Standorte. Eine Akte.",
    body: "Sie arbeiten dort, wo es zu Ihrem Leben passt — Luzern, Sursee oder Küssnacht. Wechsel zwischen Standorten sind unkompliziert.",
  },
  {
    title: "Moderne digitale Praxis",
    body: "Intraoralscanner, 3D-Planung, papierlose Dokumentation. Wir investieren in Technik, die Ihnen Zeit zurückgibt.",
  },
  {
    title: "Weiterbildung gehört zum Job",
    body: "Fortbildungen, Kongresse und Praxis-Workshops sind Arbeitszeit — nicht Freizeit. Das KFO-Wissen bleibt aktuell.",
  },
  {
    title: "Flache Hierarchie",
    body: "Klare Entscheidungen, kurze Wege. Ihr Input wird gehört — und umgesetzt, wenn er gut ist.",
  },
  {
    title: "Verlässliche Arbeitszeiten",
    body: "Geregelte Öffnungszeiten, planbare Dienste. Keine Notfalldienste am Wochenende.",
  },
  {
    title: "Faire Entlöhnung",
    body: "Marktübliche Löhne, jährliche Anpassung. Bonus bei guten Geschäftsjahren — transparent, nicht situativ.",
  },
];

export type Job = {
  slug: string;
  title: string;
  pensum: string;
  standort: string;
  start: string;
  summary: string;
  badge?: string;
};
export const jobs: Job[] = [
  {
    slug: "dental-assistent-kuessnacht",
    title: "Dentalassistent:in Kieferorthopädie",
    pensum: "80 – 100 %",
    standort: "Küssnacht am Rigi",
    start: "August 2026",
    summary:
      "Für die Eröffnung der dritten Praxis suchen wir eine erfahrene DA mit KFO-Erfahrung. Aufbau ab dem ersten Tag.",
    badge: "Neue Praxis",
  },
  {
    slug: "dental-assistent-luzern",
    title: "Dentalassistent:in",
    pensum: "60 – 80 %",
    standort: "Luzern",
    start: "Nach Vereinbarung",
    summary:
      "Verstärkung für den Hauptsitz. KFO-Erfahrung von Vorteil, nicht zwingend — Einarbeitung gewährleistet.",
  },
  {
    slug: "lehrstelle-da",
    title: "Lehrstelle Dentalassistent:in EFZ",
    pensum: "100 %",
    standort: "Luzern oder Sursee",
    start: "August 2026",
    summary:
      "Drei Jahre, mit Schule am BBZ Luzern. Wir suchen aufgeweckte junge Menschen — Vorerfahrung nicht nötig.",
  },
];
