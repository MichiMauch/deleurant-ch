import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { ContactStripData, ContactStripItem } from "@/types/content";

export function ContactStripBlock({
  data,
  pathPrefix,
}: {
  data: ContactStripData;
  pathPrefix: string;
}) {
  const newItem: ContactStripItem = {
    label: "Standort",
    value: "041 000 00 00",
    href: "tel:+41410000000",
  };
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
          {data.intro && (
            <Reveal delay={200}>
              <EditableText
                path={`${pathPrefix}.intro`}
                value={data.intro}
                as="p"
                className="mt-6 text-ink-soft text-lg leading-relaxed font-light"
              />
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.items.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative">
                <span className="absolute top-3 right-3 z-10 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Kontakt „${c.label}"`}
                  />
                </span>
                <a
                  href={c.href}
                  className="group flex items-center justify-between border border-line-soft p-6 lg:p-8 hover:border-navy transition-colors duration-500"
                >
                  <div>
                    <div className="text-xs text-mute tracking-wide uppercase mb-2">
                      <EditableText
                        path={`${pathPrefix}.items.${i}.label`}
                        value={c.label}
                        as="span"
                      />
                    </div>
                    <div className="serif text-xl text-ink font-light">
                      <EditableText
                        path={`${pathPrefix}.items.${i}.value`}
                        value={c.value}
                        as="span"
                      />
                    </div>
                    {c.detail && (
                      <div className="mt-2 text-xs text-ink-soft">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.detail`}
                          value={c.detail}
                          as="span"
                        />
                      </div>
                    )}
                  </div>
                  <span className="h-px w-8 bg-mute group-hover:w-14 group-hover:bg-navy transition-all duration-500" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Kontakt hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
