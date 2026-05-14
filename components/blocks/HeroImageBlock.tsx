import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import { EditableMediaButton } from "@/components/cms/EditableMediaButton";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { HeroImageData, MetaItem } from "@/types/content";

export function HeroImageBlock({ data, pathPrefix }: { data: HeroImageData; pathPrefix: string }) {
  const meta = data.meta ?? [];
  const newMeta: MetaItem = { label: "Label", value: "Wert" };
  return (
    <section className="relative h-[75vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={data.image}
        alt={data.eyebrow ?? ""}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/40" />
      <EditableMediaButton path={`${pathPrefix}.image`} className="top-24 right-6" />

      <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
        {data.eyebrow && (
          <Reveal>
            <EditableText
              path={`${pathPrefix}.eyebrow`}
              value={data.eyebrow}
              as="span"
              className="eyebrow text-bone/80 inline-flex items-center gap-3 mb-6"
            />
          </Reveal>
        )}
        {data.badge && (
          <Reveal delay={80}>
            <div className="inline-flex w-fit bg-navy text-bone text-[10px] tracking-widest uppercase px-3 py-1.5 mb-6">
              <EditableText path={`${pathPrefix}.badge`} value={data.badge} as="span" />
            </div>
          </Reveal>
        )}
        <Reveal delay={120}>
          <EditableRichText
            path={`${pathPrefix}.headline`}
            value={data.headline}
            as="h1"
            inline
            className="serif text-bone text-[clamp(2.75rem,7vw,6rem)] leading-[1] font-light italic [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]"
          />
        </Reveal>
        <Reveal delay={240}>
          <EditableText
            path={`${pathPrefix}.subtitle`}
            value={data.subtitle}
            as="p"
            className="mt-6 text-bone/90 text-xl max-w-xl font-light [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
          />
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-bone/85 text-xs tracking-widest uppercase">
            {meta.map((m, i) => (
              <span key={i} className="group/meta relative flex items-center gap-8">
                {i > 0 && <span className="h-8 w-px bg-bone/30" />}
                <span className="relative">
                  <span className="absolute -top-2 -right-4 opacity-0 group-hover/meta:opacity-100 transition">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.meta`}
                      items={meta}
                      index={i}
                      confirmLabel={`Meta „${m.label}"`}
                    />
                  </span>
                  <EditableText
                    path={`${pathPrefix}.meta.${i}.label`}
                    value={m.label}
                    as="span"
                    className="block text-bone/60 mb-1"
                  />
                  <EditableText
                    path={`${pathPrefix}.meta.${i}.value`}
                    value={m.value}
                    as="span"
                  />
                </span>
              </span>
            ))}
            <EditableListAddButton
              path={`${pathPrefix}.meta`}
              items={meta}
              newItem={newMeta}
              label="Meta hinzufügen"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
