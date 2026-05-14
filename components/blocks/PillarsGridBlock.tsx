import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { PillarsGridData } from "@/types/content";

export function PillarsGridBlock({
  data,
  pathPrefix,
}: {
  data: PillarsGridData;
  pathPrefix: string;
}) {
  const newItem: PillarsGridData["items"][number] = {
    linkRef: { kind: "pillar", slug: "zahnspange" },
    title: "Neues Thema",
    tagline: "Kurze Beschreibung.",
  };
  return (
    <section className="py-24 lg:py-32 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Reveal>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
          <Reveal delay={200}>
            <EditableText
              path={`${pathPrefix}.intro`}
              value={data.intro}
              as="p"
              className="mt-8 text-ink-soft text-lg leading-relaxed font-light max-w-xl"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {data.items.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                <span className="absolute top-3 right-3 z-10 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Thema „${p.title}"`}
                  />
                </span>
                <LinkRefLink
                  linkRef={p.linkRef}
                  className="group bg-bone p-8 lg:p-10 h-full flex flex-col"
                >
                <div className="serif text-mute text-sm font-light mb-6">0{i + 1}</div>
                <div className="serif text-2xl text-ink font-light leading-snug group-hover:italic transition-[font-style] duration-500">
                  <EditableText
                    path={`${pathPrefix}.items.${i}.title`}
                    value={p.title}
                    as="span"
                  />
                </div>
                <EditableText
                  path={`${pathPrefix}.items.${i}.tagline`}
                  value={p.tagline}
                  as="p"
                  className="mt-4 text-sm text-ink-soft leading-relaxed flex-1"
                />
                <span className="mt-8 inline-flex items-center gap-3 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                  <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                  Lesen
                </span>
                </LinkRefLink>
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Thema hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
