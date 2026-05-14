import { Reveal } from "@/components/reveal";
import { TerminForm } from "@/app/termin/termin-form";
import { EditableText } from "@/components/cms/EditableText";
import type { TerminFormData } from "@/types/content";

export function TerminFormBlock({
  data,
  pathPrefix,
}: {
  data: TerminFormData;
  pathPrefix: string;
}) {
  return (
    <section className="py-24 lg:py-32 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-light text-ink">
              <EditableText path={`${pathPrefix}.introTitle`} value={data.introTitle} as="span" />
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <EditableText
              path={`${pathPrefix}.introBody`}
              value={data.introBody}
              as="p"
              className="mt-6 text-ink-soft text-lg leading-relaxed font-light"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <TerminForm />
        </div>
      </div>
    </section>
  );
}
