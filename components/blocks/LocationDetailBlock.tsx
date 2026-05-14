import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { LocationDetailData, MetaItem } from "@/types/content";

export function LocationDetailBlock({
  data,
  pathPrefix,
}: {
  data: LocationDetailData;
  pathPrefix: string;
}) {
  const newHour: MetaItem = { label: "Tag", value: "08:00 – 17:00" };
  const newTransit: { mode: string; detail: string } = { mode: "Bus", detail: "Linie X · Haltestelle Y" };
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <Reveal>
            <EditableText
              path={`${pathPrefix}.description`}
              value={data.description}
              as="p"
              className="text-xl leading-relaxed text-ink-soft font-light"
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal>
              <div>
                <div className="eyebrow text-navy mb-5">— Adresse</div>
                <div className="serif text-2xl text-ink font-light leading-snug">
                  <EditableText
                    path={`${pathPrefix}.address.street`}
                    value={data.address.street}
                    as="span"
                  />
                  <br />
                  <EditableText
                    path={`${pathPrefix}.address.zip`}
                    value={data.address.zip}
                    as="span"
                  />
                </div>
                <div className="mt-6 space-y-2 text-sm">
                  <a
                    href={`tel:${data.address.phone.replace(/\s/g, "")}`}
                    className="block text-ink hover:text-navy transition-colors"
                  >
                    <EditableText
                      path={`${pathPrefix}.address.phone`}
                      value={data.address.phone}
                      as="span"
                    />
                  </a>
                  <a
                    href={`mailto:${data.address.email}`}
                    className="block text-ink-soft hover:text-navy transition-colors"
                  >
                    <EditableText
                      path={`${pathPrefix}.address.email`}
                      value={data.address.email}
                      as="span"
                    />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="eyebrow text-navy mb-5">— Sprechzeiten</div>
                <dl className="space-y-3 text-sm">
                  {data.hours.map((h, i) => (
                    <div
                      key={i}
                      className="group/row relative grid grid-cols-12 gap-3 border-t border-line-soft pt-3"
                    >
                      <span className="absolute top-2 right-0 opacity-0 group-hover/row:opacity-100 transition">
                        <EditableListRemoveButton
                          path={`${pathPrefix}.hours`}
                          items={data.hours}
                          index={i}
                          confirmLabel={`Sprechzeit „${h.label}"`}
                        />
                      </span>
                      <dt className="col-span-4 text-mute tracking-wide">
                        <EditableText
                          path={`${pathPrefix}.hours.${i}.label`}
                          value={h.label}
                          as="span"
                        />
                      </dt>
                      <dd className="col-span-8 text-ink-soft">
                        <EditableText
                          path={`${pathPrefix}.hours.${i}.value`}
                          value={h.value}
                          as="span"
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
                <EditableListAddButton
                  path={`${pathPrefix}.hours`}
                  items={data.hours}
                  newItem={newHour}
                  label="Sprechzeit hinzufügen"
                  className="mt-4"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-16">
              <div className="eyebrow text-navy mb-5">— Anfahrt</div>
              <ul className="space-y-3 text-sm">
                {data.transit.map((t, i) => (
                  <li
                    key={i}
                    className="group/row relative grid grid-cols-12 gap-3 border-t border-line-soft pt-3"
                  >
                    <span className="absolute top-2 right-0 opacity-0 group-hover/row:opacity-100 transition">
                      <EditableListRemoveButton
                        path={`${pathPrefix}.transit`}
                        items={data.transit}
                        index={i}
                        confirmLabel={`Anreise „${t.mode}"`}
                      />
                    </span>
                    <span className="col-span-4 text-mute tracking-wide">
                      <EditableText
                        path={`${pathPrefix}.transit.${i}.mode`}
                        value={t.mode}
                        as="span"
                      />
                    </span>
                    <span className="col-span-8 text-ink-soft">
                      <EditableText
                        path={`${pathPrefix}.transit.${i}.detail`}
                        value={t.detail}
                        as="span"
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <EditableListAddButton
                path={`${pathPrefix}.transit`}
                items={data.transit}
                newItem={newTransit}
                label="Anreise hinzufügen"
                className="mt-4"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
