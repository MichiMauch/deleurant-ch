"use client";

import { useState } from "react";
import Link from "next/link";
import { locations } from "@/lib/content";

const standorte = locations.map((l) => ({
  slug: l.slug,
  name: l.name,
  phone: l.phone,
}));

const anliegen = [
  { value: "kind", label: "Zahnkorrektur für mein Kind" },
  { value: "unsichtbar", label: "Ich will es unsichtbar" },
  { value: "schnell", label: "Schnellstes Ergebnis" },
  { value: "diskret", label: "Erwachsen, diskret" },
  { value: "preis", label: "Preisgünstigster Weg" },
  { value: "zweitmeinung", label: "Zweitmeinung" },
  { value: "unsicher", label: "Noch nicht sicher — bitte beraten" },
];

const dringlichkeit = [
  { value: "neutral", label: "Kein Termindruck" },
  { value: "mittel", label: "Innert 4 Wochen" },
  { value: "akut", label: "So schnell wie möglich" },
];

const patientType = [
  { value: "neu", label: "Neue Patient:in" },
  { value: "bestehend", label: "Bestehende Patient:in" },
  { value: "kind", label: "Eltern · Anfrage für Kind" },
];

export function TerminForm() {
  const [submitted, setSubmitted] = useState(false);
  const [standort, setStandort] = useState("luzern");
  const [name, setName] = useState("");

  if (submitted) {
    return (
      <div className="bg-bone-deep/40 p-10 lg:p-16">
        <div className="eyebrow text-navy mb-6">— Anfrage gesendet</div>
        <h2 className="serif text-3xl lg:text-4xl text-ink font-light italic leading-snug max-w-xl">
          Vielen Dank, {name || "wir melden uns"}.
        </h2>
        <p className="mt-6 text-ink-soft text-lg leading-relaxed font-light max-w-xl">
          Wir melden uns innerhalb von 24 Stunden — werktags meist deutlich
          schneller. Sie erhalten eine Bestätigung per E-Mail.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm tracking-wide text-ink group"
          >
            <span className="h-px w-8 bg-navy group-hover:w-12 transition-all duration-500" />
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-12"
    >
      {/* Patient-Typ */}
      <fieldset>
        <legend className="eyebrow text-navy mb-5">— Sie sind</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {patientType.map((p, i) => (
            <label
              key={p.value}
              className="flex items-center gap-3 border border-line-soft p-4 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30"
            >
              <input
                type="radio"
                name="patient_type"
                value={p.value}
                defaultChecked={i === 0}
                className="accent-navy"
              />
              <span className="text-sm text-ink">{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Standort */}
      <fieldset>
        <legend className="eyebrow text-navy mb-5">— Standort</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {standorte.map((s) => (
            <label
              key={s.slug}
              className="flex items-center gap-3 border border-line-soft p-4 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30"
            >
              <input
                type="radio"
                name="standort"
                value={s.slug}
                checked={standort === s.slug}
                onChange={(e) => setStandort(e.target.value)}
                className="accent-navy"
              />
              <span className="text-sm text-ink">{s.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Überweisung */}
      <fieldset>
        <legend className="eyebrow text-navy mb-5">
          — Wurden Sie überwiesen?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-3 border border-line-soft p-4 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30">
            <input
              type="radio"
              name="ueberweisung"
              value="ja"
              className="accent-navy"
            />
            <span className="text-sm text-ink">Ja, vom Zahnarzt</span>
          </label>
          <label className="flex items-center gap-3 border border-line-soft p-4 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30">
            <input
              type="radio"
              name="ueberweisung"
              value="nein"
              defaultChecked
              className="accent-navy"
            />
            <span className="text-sm text-ink">Nein, Eigenanmeldung</span>
          </label>
        </div>
      </fieldset>

      {/* Anliegen */}
      <fieldset>
        <legend className="eyebrow text-navy mb-5">— Ihr Anliegen</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {anliegen.map((a, i) => (
            <label
              key={a.value}
              className="flex items-center gap-3 border border-line-soft p-3.5 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30"
            >
              <input
                type="radio"
                name="anliegen"
                value={a.value}
                defaultChecked={i === 0}
                className="accent-navy"
              />
              <span className="text-sm text-ink">{a.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Dringlichkeit */}
      <fieldset>
        <legend className="eyebrow text-navy mb-5">— Dringlichkeit</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dringlichkeit.map((d, i) => (
            <label
              key={d.value}
              className="flex items-center gap-3 border border-line-soft p-4 cursor-pointer hover:border-navy transition-colors duration-500 has-[:checked]:border-navy has-[:checked]:bg-navy-mist/30"
            >
              <input
                type="radio"
                name="dringlichkeit"
                value={d.value}
                defaultChecked={i === 0}
                className="accent-navy"
              />
              <span className="text-sm text-ink">{d.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Kontakt */}
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <legend className="eyebrow text-navy mb-5 col-span-full">
          — Kontakt
        </legend>
        <label className="block">
          <span className="text-xs tracking-wide text-mute uppercase">
            Name *
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border-b border-line-soft bg-transparent py-2 text-ink focus:border-navy focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-wide text-mute uppercase">
            Alter (Patient:in)
          </span>
          <input
            type="text"
            placeholder="z. B. 12 oder 34"
            className="mt-2 w-full border-b border-line-soft bg-transparent py-2 text-ink placeholder:text-mute/60 focus:border-navy focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-wide text-mute uppercase">
            E-Mail *
          </span>
          <input
            required
            type="email"
            className="mt-2 w-full border-b border-line-soft bg-transparent py-2 text-ink focus:border-navy focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-wide text-mute uppercase">
            Telefon
          </span>
          <input
            type="tel"
            className="mt-2 w-full border-b border-line-soft bg-transparent py-2 text-ink focus:border-navy focus:outline-none transition-colors"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs tracking-wide text-mute uppercase">
            Ergänzende Hinweise
          </span>
          <textarea
            rows={4}
            placeholder="Optional — Vorbehandlungen, Beschwerden, Fragen …"
            className="mt-2 w-full border-b border-line-soft bg-transparent py-2 text-ink placeholder:text-mute/60 focus:border-navy focus:outline-none transition-colors resize-none"
          />
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-line-soft">
        <p className="text-xs text-mute max-w-md leading-relaxed">
          Wir melden uns innerhalb von 24 Stunden (werktags). Datenschutz: Ihre
          Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-navy text-bone px-8 py-4 text-sm tracking-wide hover:bg-navy-soft transition-colors duration-500"
        >
          Anfrage absenden
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10m-4-4 4 4-4 4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
