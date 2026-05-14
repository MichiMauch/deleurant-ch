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
import type { TreatmentsTeaserData, TreatmentsTeaserItem } from "@/types/content";

export function TreatmentsTeaserBlock({
  data,
  pathPrefix,
}: {
  data: TreatmentsTeaserData;
  pathPrefix: string;
}) {
  const compact = data.divider === true;
  const newItem: TreatmentsTeaserItem = {
    title: "Methode",
    tagline: "Tagline.",
    photo: "/images/festsitzend-photo.jpg",
    linkRef: { kind: "treatment", slug: "festsitzend" },
  };
  if (compact) {
    return (
      <section className="bg-bone-deep/40 pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal delay={300}>
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-line-soft" />
              <span className="eyebrow text-mute">oder nach Methode</span>
              <span className="h-px flex-1 bg-line-soft" />
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {data.items.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative">
                  <span className="absolute top-3 left-3 z-10 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.items`}
                      items={data.items}
                      index={i}
                      confirmLabel={`Methode „${t.title}"`}
                    />
                  </span>
                  <LinkRefLink
                    linkRef={t.linkRef}
                    className="group bg-bone flex items-center gap-5 p-5 lg:p-6 h-full"
                  >
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 overflow-hidden bg-bone-deep/40">
                      <Image
                        src={t.photo}
                        alt={t.title}
                        fill
                        sizes="100px"
                        className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="serif text-lg text-ink font-light italic">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.title`}
                          value={t.title}
                          as="span"
                        />
                      </div>
                      <EditableText
                        path={`${pathPrefix}.items.${i}.tagline`}
                        value={t.tagline}
                        as="div"
                        className="mt-1 text-sm text-ink-soft font-light leading-snug"
                      />
                      <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-wide text-mute group-hover:text-navy transition-colors">
                        <span className="h-px w-5 bg-mute group-hover:w-9 group-hover:bg-navy transition-all duration-500" />
                        Mehr
                      </span>
                    </div>
                  </LinkRefLink>
                  <EditableMediaButton path={`${pathPrefix}.items.${i}.photo`} />
                </div>
              </Reveal>
            ))}
          </div>
          <EditableListAddButton
            path={`${pathPrefix}.items`}
            items={data.items}
            newItem={newItem}
            label="Methode hinzufügen"
            className="mt-8"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-32 lg:pb-48 border-t border-line-soft pt-24 lg:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {data.headline && (
          <>
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Weitere Methoden</div>
            </Reveal>
            <Reveal delay={120}>
              <EditableRichText
                path={`${pathPrefix}.headline`}
                value={data.headline}
                as="h2"
                inline
                className="serif text-[clamp(1.75rem,3.5vw,3rem)] font-light text-ink mb-16"
              />
            </Reveal>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {data.items.map((o, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative">
                <span className="absolute top-3 left-3 z-10 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.items`}
                    items={data.items}
                    index={i}
                    confirmLabel={`Methode „${o.title}"`}
                  />
                </span>
                <LinkRefLink linkRef={o.linkRef} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep/40">
                    <Image
                      src={o.photo}
                      alt={o.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-[filter] duration-[1500ms] ease-out group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    {o.accent && (
                      <div className="absolute top-5 left-5 flex items-center gap-3 text-bone">
                        <span className="eyebrow text-bone/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                          {o.accent}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="serif text-2xl text-ink font-light italic">
                        <EditableText
                          path={`${pathPrefix}.items.${i}.title`}
                          value={o.title}
                          as="span"
                        />
                      </div>
                      <EditableText
                        path={`${pathPrefix}.items.${i}.tagline`}
                        value={o.tagline}
                        as="div"
                        className="mt-2 text-sm text-ink-soft font-light leading-relaxed max-w-md"
                      />
                    </div>
                    <span className="text-xs tracking-wide text-mute group-hover:text-navy transition-colors mt-2 inline-flex items-center gap-2 shrink-0">
                      <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                      Ansehen
                    </span>
                  </div>
                </LinkRefLink>
                <EditableMediaButton path={`${pathPrefix}.items.${i}.photo`} />
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="Methode hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
