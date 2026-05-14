import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import { EditableMediaButton } from "@/components/cms/EditableMediaButton";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { DoctorSpotlightData } from "@/types/content";

export function DoctorSpotlightBlock({
  data,
  pathPrefix,
}: {
  data: DoctorSpotlightData;
  pathPrefix: string;
}) {
  return (
    <section id="team" className="py-32 lg:py-48 bg-bone-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={data.image}
              alt={data.eyebrow}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <EditableMediaButton path={`${pathPrefix}.image`} />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="eyebrow text-navy mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-navy" />
              <EditableText path={`${pathPrefix}.eyebrow`} value={data.eyebrow} as="span" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-light text-ink"
            />
          </Reveal>
          <Reveal delay={240}>
            <EditableText
              path={`${pathPrefix}.credentials`}
              value={data.credentials}
              as="p"
              className="mt-6 text-mute text-sm tracking-wide"
            />
          </Reveal>
          <Reveal delay={360}>
            <EditableText
              path={`${pathPrefix}.body`}
              value={data.body}
              as="p"
              className="mt-10 text-lg text-ink-soft font-light leading-relaxed max-w-lg"
            />
          </Reveal>
          <Reveal delay={480}>
            <EditableText
              path={`${pathPrefix}.quote`}
              value={data.quote}
              as="blockquote"
              className="serif italic text-xl lg:text-2xl text-ink leading-relaxed mt-8 max-w-lg border-l-2 border-navy/40 pl-6"
            />
          </Reveal>
          {data.link && (
            <Reveal delay={580}>
              <LinkRefLink
                linkRef={data.link.linkRef}
                className="mt-10 inline-flex items-center gap-3 text-xs tracking-wide text-mute hover:text-navy transition-colors group"
              >
                <span className="h-px w-6 bg-mute group-hover:w-10 group-hover:bg-navy transition-all duration-500" />
                <EditableText
                  path={`${pathPrefix}.link.label`}
                  value={data.link.label}
                  as="span"
                />
              </LinkRefLink>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
