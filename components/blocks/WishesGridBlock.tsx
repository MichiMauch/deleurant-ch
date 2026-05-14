import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { WishesGridData, WishItem } from "@/types/content";

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
    return (
      <svg {...common}>
        <circle cx="8" cy="7" r="2.4" />
        <path d="M3 20v-2.5A3.5 3.5 0 0 1 6.5 14h3a3.5 3.5 0 0 1 3.5 3.5V20" />
        <circle cx="16" cy="7" r="2.4" />
        <path d="M14 14h1.5a3.5 3.5 0 0 1 3.5 3.5V20" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="7" r="2.6" />
      <path d="M5 20v-2.5A4.5 4.5 0 0 1 9.5 13h5a4.5 4.5 0 0 1 4.5 4.5V20" />
    </svg>
  );
}

export function WishesGridBlock({ data, pathPrefix }: { data: WishesGridData; pathPrefix: string }) {
  const newWish: WishItem = {
    number: String(data.items.length + 1).padStart(2, "0"),
    title: "Neuer Wunsch",
    audience: "Beide",
    answer: "Antwort in einem Satz.",
    linkRef: { kind: "page", slug: "termin" },
  };
  return (
    <section id="wunsch" className="py-24 lg:py-32 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl mb-14 lg:mb-20">
          {data.eyebrow && (
            <Reveal>
              <div className="eyebrow text-navy mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                <EditableText path={`${pathPrefix}.eyebrow`} value={data.eyebrow} as="span" />
              </div>
            </Reveal>
          )}
          <Reveal delay={120}>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
          <Reveal delay={240}>
            <EditableText
              path={`${pathPrefix}.intro`}
              value={data.intro}
              as="p"
              className="mt-8 text-ink-soft text-lg leading-relaxed font-light max-w-xl"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {data.items.map((w, i) => (
            <Reveal key={i} delay={Math.min(i, 2) * 80}>
              <div className="relative">
                <span className="absolute top-3 right-3 z-10 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Wunsch „${w.title}"`}
                  />
                </span>
              <LinkRefLink
                linkRef={w.linkRef}
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
                    <EditableText
                      path={`${pathPrefix}.items.${i}.number`}
                      value={w.number}
                      as="span"
                    />
                  </span>
                  <span className="inline-flex items-center gap-2 eyebrow text-navy mt-2">
                    <AudienceIcon audience={w.audience} />
                    <EditableText
                      path={`${pathPrefix}.items.${i}.audience`}
                      value={w.audience}
                      as="span"
                    />
                  </span>
                </div>

                <div className="serif text-2xl text-ink font-light leading-snug mb-4 group-hover:italic transition-[font-style] duration-500">
                  <EditableText
                    path={`${pathPrefix}.items.${i}.title`}
                    value={w.title}
                    as="span"
                  />
                </div>
                <EditableText
                  path={`${pathPrefix}.items.${i}.answer`}
                  value={w.answer}
                  as="p"
                  className="text-sm text-ink-soft leading-relaxed flex-1"
                />
                <span className="mt-8 inline-flex items-center gap-3 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                  <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                  Weiter
                </span>
              </LinkRefLink>
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newWish}
          label="Wunsch hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
