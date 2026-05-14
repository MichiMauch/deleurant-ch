import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import { EditableMediaButton } from "@/components/cms/EditableMediaButton";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { LocationsTeaserData, LocationsTeaserItem } from "@/types/content";

export function LocationsTeaserBlock({
  data,
  pathPrefix,
}: {
  data: LocationsTeaserData;
  pathPrefix: string;
}) {
  const newItem: LocationsTeaserItem = {
    linkRef: { kind: "location", slug: "luzern" },
    name: "Neuer Standort",
    address: "Strasse",
    zip: "PLZ Ort",
    image: "/images/home.jpg",
  };
  return (
    <section id="standorte" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-8 mb-12 lg:mb-16">
          <Reveal>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-light text-ink"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.items.map((loc, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative">
                <span className="absolute top-3 left-3 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Standort „${loc.name}"`}
                  />
                </span>
                <LinkRefLink linkRef={loc.linkRef} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                    {loc.badge && (
                      <div className="absolute top-5 left-5 text-bone text-[10px] tracking-widest uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.badge`}
                          value={loc.badge}
                          as="span"
                        />
                      </div>
                    )}
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-xl text-ink font-light italic">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.name`}
                          value={loc.name}
                          as="span"
                        />
                      </div>
                      <div className="mt-1 text-sm text-ink-soft font-light leading-relaxed">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.address`}
                          value={loc.address}
                          as="span"
                        />{" "}
                        ·{" "}
                        <EditableText
                          path={`${pathPrefix}.items.${i}.zip`}
                          value={loc.zip}
                          as="span"
                        />
                      </div>
                    </div>
                    <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-1 inline-flex items-center gap-2 shrink-0">
                      <span className="h-px w-5 bg-mute group-hover:w-9 group-hover:bg-navy transition-all duration-500" />
                      Anfahrt
                    </span>
                  </div>
                </LinkRefLink>
                <EditableMediaButton path={`${pathPrefix}.items.${i}.image`} />
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Standort hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
