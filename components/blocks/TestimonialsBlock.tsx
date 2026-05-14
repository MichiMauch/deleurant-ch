import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { TestimonialItem, TestimonialsData } from "@/types/content";

export function TestimonialsBlock({
  data,
  pathPrefix,
}: {
  data: TestimonialsData;
  pathPrefix: string;
}) {
  const newItem: TestimonialItem = {
    quote: "Zitat einer zufriedenen Patient:in.",
    name: "Vorname N.",
    treatment: "Behandlung · Dauer",
  };
  return (
    <section className="py-32 lg:py-48 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-20">
          <Reveal>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {data.items.map((t, i) => (
            <Reveal key={i} delay={i * 150}>
              <figure className="group relative bg-bone p-10 lg:p-12 h-full flex flex-col">
                <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Stimme von „${t.name}"`}
                  />
                </span>
                <EditableText
                  path={`${pathPrefix}.items.${i}.quote`}
                  value={t.quote}
                  as="blockquote"
                  className="serif text-lg leading-relaxed text-ink italic font-light flex-1"
                />
                <figcaption className="mt-8 pt-6 border-t border-line-soft">
                  <EditableText
                    path={`${pathPrefix}.items.${i}.name`}
                    value={t.name}
                    as="div"
                    className="text-sm text-ink"
                  />
                  <EditableText
                    path={`${pathPrefix}.items.${i}.treatment`}
                    value={t.treatment}
                    as="div"
                    className="mt-1 text-xs text-mute tracking-wide"
                  />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Stimme hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
