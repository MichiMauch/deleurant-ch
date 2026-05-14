import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { BenefitItem, TreatmentDetailData } from "@/types/content";

export function TreatmentDetailBlock({
  data,
  pathPrefix,
}: {
  data: TreatmentDetailData;
  pathPrefix: string;
}) {
  const newBenefit: BenefitItem = { title: "Vorteil", body: "Beschreibung." };
  const newForWhom = "Zielgruppe";
  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Im Überblick</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-light text-ink">
                <EditableText path={`${pathPrefix}.intro`} value={data.intro} as="span" />
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={240}>
            <EditableText
              path={`${pathPrefix}.long`}
              value={data.long}
              as="p"
              className="text-xl text-ink-soft font-light leading-relaxed"
            />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line-soft border border-line-soft">
              {data.benefits.map((b, i) => (
                <div key={i} className="group/row relative bg-bone p-6">
                  <span className="absolute top-2 right-2 opacity-0 group-hover/row:opacity-100 transition">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.benefits`}
                      items={data.benefits}
                      index={i}
                      confirmLabel={`Vorteil „${b.title}"`}
                    />
                  </span>
                  <div className="serif text-lg text-ink font-light italic mb-2">
                    <EditableText
                      path={`${pathPrefix}.benefits.${i}.title`}
                      value={b.title}
                      as="span"
                    />
                  </div>
                  <EditableText
                    path={`${pathPrefix}.benefits.${i}.body`}
                    value={b.body}
                    as="p"
                    className="text-sm text-ink-soft leading-relaxed"
                  />
                </div>
              ))}
            </div>
            <EditableListAddButton
              path={`${pathPrefix}.benefits`}
              items={data.benefits}
              newItem={newBenefit}
              label="Vorteil hinzufügen"
              className="mt-6"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-bone-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow text-navy mb-6">— Für wen geeignet</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-light text-ink">
                Passt diese
                <br />
                <span className="italic">Methode zu Ihnen?</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={200}>
            <ul className="space-y-0">
              {data.forWhom.map((w, i) => (
                <li
                  key={i}
                  className="group/row relative grid grid-cols-12 gap-4 items-baseline border-t border-line py-6 last:border-b"
                >
                  <span className="absolute top-4 right-0 opacity-0 group-hover/row:opacity-100 transition">
                    <EditableListRemoveButton
                      path={`${pathPrefix}.forWhom`}
                      items={data.forWhom}
                      index={i}
                      confirmLabel={`Zielgruppe „${w}"`}
                    />
                  </span>
                  <span className="col-span-1 serif text-navy/70 text-sm font-light">
                    0{i + 1}
                  </span>
                  <EditableText
                    path={`${pathPrefix}.forWhom.${i}`}
                    value={w}
                    as="span"
                    wrapperClassName="col-span-11"
                    className="text-lg text-ink font-light leading-relaxed"
                  />
                </li>
              ))}
            </ul>
            <EditableListAddButton
              path={`${pathPrefix}.forWhom`}
              items={data.forWhom}
              newItem={newForWhom}
              label="Zielgruppe hinzufügen"
              className="mt-6"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
