import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import { EditableMediaButton } from "@/components/cms/EditableMediaButton";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { HeroVideoData } from "@/types/content";

export function HeroVideoBlock({ data, pathPrefix }: { data: HeroVideoData; pathPrefix: string }) {
  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={data.poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={data.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/50" />
      <EditableMediaButton
        path={`${pathPrefix}.video`}
        resourceType="video"
        label="Video ersetzen"
        className="top-24 right-6"
      />
      <EditableMediaButton
        path={`${pathPrefix}.poster`}
        resourceType="image"
        label="Poster ersetzen"
        className="top-24 right-[170px]"
      />

      <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center">
        <div className="max-w-3xl pt-20">
          <Reveal delay={200}>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h1"
              inline
              className="serif text-bone text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-tight font-light [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
            />
          </Reveal>
          <Reveal delay={400}>
            <EditableText
              path={`${pathPrefix}.subtitle`}
              value={data.subtitle}
              as="p"
              className="mt-6 max-w-xl text-bone/85 text-base lg:text-lg leading-relaxed font-light [text-shadow:0_1px_18px_rgba(0,0,0,0.35)]"
            />
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              {data.ctaPrimary && (
                <LinkRefLink
                  linkRef={data.ctaPrimary.linkRef}
                  className="group inline-flex items-center gap-4 bg-navy hover:bg-navy-soft text-bone px-7 py-4 text-sm tracking-wide transition-colors duration-500 [box-shadow:0_8px_32px_rgba(0,0,0,0.25)]"
                >
                  <EditableText
                    path={`${pathPrefix}.ctaPrimary.label`}
                    value={data.ctaPrimary.label}
                    as="span"
                  />
                  <Arrow />
                </LinkRefLink>
              )}
              {data.ctaSecondary && (
                <LinkRefLink
                  linkRef={data.ctaSecondary.linkRef}
                  className="inline-flex items-center gap-4 text-bone/90 hover:text-bone text-sm tracking-wide group transition-colors"
                >
                  <span className="h-px w-10 bg-bone/70 transition-all duration-700 group-hover:w-16" />
                  <EditableText
                    path={`${pathPrefix}.ctaSecondary.label`}
                    value={data.ctaSecondary.label}
                    as="span"
                  />
                </LinkRefLink>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 group-hover:translate-x-1"
    >
      <path d="M2 10h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
