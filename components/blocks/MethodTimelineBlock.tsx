import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { MethodStep, MethodTimelineData } from "@/types/content";

export function MethodTimelineBlock({
  data,
  pathPrefix,
}: {
  data: MethodTimelineData;
  pathPrefix: string;
}) {
  const newStep: MethodStep = { title: "Neuer Schritt", duration: "Dauer" };
  return (
    <section id="methode" className="py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
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
              className="mt-8 text-ink-soft text-base leading-relaxed font-light max-w-md"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="grid grid-cols-5 gap-1 mb-10" role="presentation" aria-hidden>
              {data.steps.map((_, i) => (
                <span
                  key={i}
                  className="h-px bg-navy/40"
                  style={{ opacity: 1 - i * 0.12 }}
                />
              ))}
            </div>
          </Reveal>

          <div className="space-y-0">
            {data.steps.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group relative grid grid-cols-12 items-baseline gap-4 border-t border-line-soft py-6 last:border-b">
                  <span className="absolute top-4 right-0 opacity-0 group-hover:opacity-100 transition">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.steps`}
                      items={data.steps}
                      index={i}
                      confirmLabel={`Schritt „${step.title}"`}
                    />
                  </span>
                  <span className="col-span-2 lg:col-span-1 serif text-navy text-sm font-light tabular-nums">
                    0{i + 1}
                  </span>
                  <EditableText
                    path={`${pathPrefix}.steps.${i}.title`}
                    value={step.title}
                    as="span"
                    wrapperClassName="col-span-7 lg:col-span-8"
                    className="text-ink font-light"
                  />
                  <EditableText
                    path={`${pathPrefix}.steps.${i}.duration`}
                    value={step.duration}
                    as="span"
                    wrapperClassName="col-span-3 text-right"
                    className="text-xs text-mute tracking-wide tabular-nums"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <EditableListAddButton
            path={`${pathPrefix}.steps`}
            items={data.steps}
            newItem={newStep}
            label="Schritt hinzufügen"
            className="mt-6"
          />

          {data.cta && (
            <Reveal delay={500}>
              <LinkRefLink
                linkRef={data.cta.linkRef}
                className="mt-10 flex items-center justify-between gap-6 border border-line-soft hover:border-navy/60 p-6 lg:p-8 group transition-colors duration-500"
              >
                <div className="min-w-0">
                  <div className="serif text-lg lg:text-xl text-ink font-light">
                    <EditableText
                      path={`${pathPrefix}.cta.label`}
                      value={data.cta.label}
                      as="span"
                    />
                  </div>
                  {data.cta.subtitle && (
                    <EditableText
                      path={`${pathPrefix}.cta.subtitle`}
                      value={data.cta.subtitle}
                      as="p"
                      className="mt-1 text-sm text-ink-soft leading-relaxed"
                    />
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-xs tracking-wide text-navy shrink-0">
                  <span className="h-px w-6 bg-navy transition-all duration-500 group-hover:w-10" />
                  Termin
                </span>
              </LinkRefLink>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
