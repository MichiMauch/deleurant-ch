import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { JobItem, JobsListData } from "@/types/content";

export function JobsListBlock({ data, pathPrefix }: { data: JobsListData; pathPrefix: string }) {
  const newJob: JobItem = {
    slug: "neue-stelle",
    title: "Stellentitel",
    pensum: "80 – 100 %",
    standort: "Luzern",
    start: "Nach Vereinbarung",
    summary: "Kurze Beschreibung der Stelle.",
  };
  return (
    <section className="py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
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
                className="mt-6 text-ink-soft text-lg leading-relaxed font-light"
              />
            </Reveal>
          )}
        </div>

        <ul className="space-y-0">
          {data.items.map((j, i) => (
            <Reveal key={i} delay={i * 80}>
              <li className="group relative grid grid-cols-12 gap-6 items-baseline border-t border-line py-8 last:border-b">
                <span className="absolute top-4 right-0 opacity-0 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Stelle „${j.title}"`}
                  />
                </span>
                <div className="col-span-12 lg:col-span-5">
                  <div className="serif text-xl lg:text-2xl text-ink font-light">
                    <EditableText
                      path={`${pathPrefix}.items.${i}.title`}
                      value={j.title}
                      as="span"
                    />
                  </div>
                  {j.badge && (
                    <span className="mt-2 inline-flex bg-navy text-bone text-[10px] tracking-widest uppercase px-2.5 py-1">
                      <EditableText
                        path={`${pathPrefix}.items.${i}.badge`}
                        value={j.badge}
                        as="span"
                      />
                    </span>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-3 text-sm text-ink-soft">
                  <div>
                    <span className="text-mute tracking-wide">Pensum </span>
                    <EditableText
                      path={`${pathPrefix}.items.${i}.pensum`}
                      value={j.pensum}
                      as="span"
                    />
                  </div>
                  <div className="mt-1">
                    <span className="text-mute tracking-wide">Standort </span>
                    <EditableText
                      path={`${pathPrefix}.items.${i}.standort`}
                      value={j.standort}
                      as="span"
                    />
                  </div>
                  <div className="mt-1">
                    <span className="text-mute tracking-wide">Start </span>
                    <EditableText
                      path={`${pathPrefix}.items.${i}.start`}
                      value={j.start}
                      as="span"
                    />
                  </div>
                </div>
                <EditableText
                  path={`${pathPrefix}.items.${i}.summary`}
                  value={j.summary}
                  as="p"
                  wrapperClassName="col-span-12 lg:col-span-4"
                  className="text-sm text-ink-soft leading-relaxed"
                />
              </li>
            </Reveal>
          ))}
        </ul>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newJob}
          label="Stelle hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
