import { Reveal } from "@/components/reveal";
import { FaqJsonLd } from "@/components/faq-jsonld";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { FAQData, FaqItem } from "@/types/content";

export function FAQBlock({ data, pathPrefix }: { data: FAQData; pathPrefix: string }) {
  const newFaq: FaqItem = { q: "Neue Frage?", a: "Antwort in einem Satz." };
  return (
    <section className="py-24 lg:py-32">
      {data.jsonLd && <FaqJsonLd items={data.items} />}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Fragen</div>
          </Reveal>
          <Reveal delay={120}>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {data.items.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <details className="group relative border-t border-line-soft last:border-b py-7 cursor-pointer">
                <div className="absolute top-4 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  <span className="pointer-events-auto">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.items`}
                      items={data.items}
                      index={i}
                      confirmLabel={`Frage „${f.q}"`}
                    />
                  </span>
                </div>
                <summary className="flex items-start justify-between gap-6 list-none">
                  <span className="serif text-xl text-ink font-light leading-snug">
                    <EditableText
                      path={`${pathPrefix}.items.${i}.q`}
                      value={f.q}
                      as="span"
                    />
                  </span>
                  <span className="shrink-0 mt-2 text-navy transition-transform duration-500 group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                </summary>
                <EditableText
                  path={`${pathPrefix}.items.${i}.a`}
                  value={f.a}
                  as="p"
                  className="mt-5 text-ink-soft leading-relaxed font-light max-w-2xl"
                />
              </details>
            </Reveal>
          ))}
          <EditableListAddButton
            path={`${pathPrefix}.items`}
            items={data.items}
            newItem={newFaq}
            label="Frage hinzufügen"
            className="mt-8"
          />
        </div>
      </div>
    </section>
  );
}
