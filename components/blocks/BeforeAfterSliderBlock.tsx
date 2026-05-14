import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { BeforeAfterPair, BeforeAfterSliderData } from "@/types/content";

export function BeforeAfterSliderBlock({
  data,
  pathPrefix,
}: {
  data: BeforeAfterSliderData;
  pathPrefix: string;
}) {
  const dark = data.theme === "dark";
  const newPair: BeforeAfterPair = {
    before: "/images/ba1-vorher.jpg",
    after: "/images/ba1-nachher.jpg",
    duration: "12 Monate",
  };
  return (
    <section className={`py-24 lg:py-32 ${dark ? "bg-ink text-bone" : "bg-bone"}`}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <div className={`eyebrow ${dark ? "text-bone/60" : "text-navy"} mb-6`}>— Reale Resultate</div>
            </Reveal>
            <Reveal delay={120}>
              <EditableRichText
                path={`${pathPrefix}.headline`}
                value={data.headline}
                as="h2"
                inline
                className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-light"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={200}>
              <EditableText
                path={`${pathPrefix}.intro`}
                value={data.intro}
                as="p"
                className={`${dark ? "text-bone/70" : "text-ink-soft"} text-lg leading-relaxed font-light`}
              />
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.pairs.map((b, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group relative space-y-5">
                <span className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.pairs`}
                    items={data.pairs}
                    index={i}
                    confirmLabel={`Vorher/Nachher #${i + 1}`}
                  />
                </span>
                <BeforeAfter before={b.before} after={b.after} />
                <div
                  className={`flex items-center justify-between text-xs ${dark ? "text-bone/70" : "text-ink-soft"}`}
                >
                  <EditableText
                    path={`${pathPrefix}.pairs.${i}.label`}
                    value={b.label ?? ""}
                    as="span"
                    className="tracking-wide"
                  />
                  <EditableText
                    path={`${pathPrefix}.pairs.${i}.duration`}
                    value={b.duration}
                    as="span"
                    className={dark ? "text-bone/50" : "text-mute"}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.pairs`}
          items={data.pairs}
          newItem={newPair}
          label="Vorher/Nachher-Paar hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
