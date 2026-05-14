import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import { LinkRefLink } from "@/components/cms/LinkRefLink";
import type { CallToActionData } from "@/types/content";

export function CallToActionBlock({
  data,
  pathPrefix,
}: {
  data: CallToActionData;
  pathPrefix: string;
}) {
  const theme = data.theme ?? "dark";

  if (theme === "outline") {
    return (
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <EditableRichText
                path={`${pathPrefix}.headline`}
                value={data.headline}
                as="h2"
                inline
                className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink"
              />
            </Reveal>
            <Reveal delay={200}>
              <EditableText
                path={`${pathPrefix}.subtitle`}
                value={data.subtitle}
                as="p"
                className="mt-6 text-ink-soft text-lg max-w-lg leading-relaxed font-light"
              />
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={300}>
            <LinkRefLink
              linkRef={data.ctaPrimary.linkRef}
              className="group flex items-center justify-between border border-ink/20 px-8 py-6 hover:border-ink/60 transition-colors duration-500"
            >
              <span className="serif text-xl text-ink font-light italic">
                <EditableText
                  path={`${pathPrefix}.ctaPrimary.label`}
                  value={data.ctaPrimary.label}
                  as="span"
                />
              </span>
              <Arrow className="text-ink/70" />
            </LinkRefLink>
          </Reveal>
        </div>
      </section>
    );
  }

  const dark = theme === "dark";

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div
          className={`relative overflow-hidden p-10 lg:p-20 ${
            dark ? "bg-ink text-bone" : "bg-bone-deep/40 text-ink"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <EditableRichText
                  path={`${pathPrefix}.headline`}
                  value={data.headline}
                  as="h2"
                  inline
                  className="serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-light"
                />
              </Reveal>
              <Reveal delay={240}>
                <EditableText
                  path={`${pathPrefix}.subtitle`}
                  value={data.subtitle}
                  as="p"
                  className={`mt-8 text-lg max-w-lg font-light leading-relaxed ${
                    dark ? "text-bone/70" : "text-ink-soft"
                  }`}
                />
              </Reveal>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <Reveal delay={200}>
                <LinkRefLink
                  linkRef={data.ctaPrimary.linkRef}
                  className="group flex items-center justify-between bg-navy text-bone px-8 py-6 hover:bg-navy-soft transition-colors duration-500"
                >
                  <span className="serif text-xl font-light">
                    <EditableText
                      path={`${pathPrefix}.ctaPrimary.label`}
                      value={data.ctaPrimary.label}
                      as="span"
                    />
                  </span>
                  <Arrow />
                </LinkRefLink>
              </Reveal>
              {data.ctaSecondary && (
                <Reveal delay={320}>
                  <LinkRefLink
                    linkRef={data.ctaSecondary.linkRef}
                    className={`group flex items-center justify-between border px-8 py-6 transition-colors duration-500 ${
                      dark
                        ? "border-bone/20 hover:border-bone/60"
                        : "border-ink/20 hover:border-ink/60"
                    }`}
                  >
                    <span className={`serif text-xl font-light ${dark ? "text-bone" : "text-ink"}`}>
                      <EditableText
                        path={`${pathPrefix}.ctaSecondary.label`}
                        value={data.ctaSecondary.label}
                        as="span"
                      />
                    </span>
                    <Arrow className={dark ? "text-bone/70" : "text-ink/70"} />
                  </LinkRefLink>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`transition-transform duration-500 group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M2 10h16m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}
