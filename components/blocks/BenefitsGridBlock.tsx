import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { BenefitItem, BenefitsGridData } from "@/types/content";

export function BenefitsGridBlock({
  data,
  pathPrefix,
}: {
  data: BenefitsGridData;
  pathPrefix: string;
}) {
  const newItem: BenefitItem = { title: "Neuer Vorteil", body: "Beschreibung in einem Satz." };
  return (
    <section className="py-24 lg:py-32 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
          {data.intro && (
            <Reveal delay={200}>
              <EditableText
                path={`${pathPrefix}.intro`}
                value={data.intro}
                as="p"
                className="mt-6 text-ink-soft text-lg leading-relaxed font-light max-w-xl"
              />
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {data.items.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group relative bg-bone p-8 lg:p-10 h-full flex flex-col">
                <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Vorteil „${b.title}"`}
                  />
                </span>
                <div className="serif text-mute text-sm font-light mb-6">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="serif text-xl text-ink font-light italic mb-3">
                  <EditableText
                    path={`${pathPrefix}.items.${i}.title`}
                    value={b.title}
                    as="span"
                  />
                </div>
                <EditableText
                  path={`${pathPrefix}.items.${i}.body`}
                  value={b.body}
                  as="p"
                  className="text-sm text-ink-soft leading-relaxed"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Vorteil hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
