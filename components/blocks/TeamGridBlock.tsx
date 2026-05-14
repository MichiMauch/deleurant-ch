import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/cms/EditableText";
import { EditableRichText } from "@/components/cms/EditableRichText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { TeamGridData, TeamMemberItem } from "@/types/content";

export function TeamGridBlock({ data, pathPrefix }: { data: TeamGridData; pathPrefix: string }) {
  const newMember: TeamMemberItem = {
    slug: "neues-mitglied",
    name: "Vorname Nachname",
    role: "Rolle",
    standort: "Standort",
    bio: "Kurze Bio.",
  };
  return (
    <section className="py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-20">
          <Reveal>
            <div className="eyebrow text-navy mb-6">— Mitwirkende</div>
          </Reveal>
          <Reveal delay={120}>
            <EditableRichText
              path={`${pathPrefix}.headline`}
              value={data.headline}
              as="h2"
              inline
              className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light text-ink"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {data.members.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="group relative bg-bone p-8 lg:p-10 h-full flex flex-col">
                <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <EditableListRemoveButton
                    path={`${pathPrefix}.members`}
                    items={data.members}
                    index={i}
                    confirmLabel={`Mitglied „${m.name}"`}
                  />
                </span>
                <div className="serif text-mute text-sm font-light mb-6">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="serif text-xl text-ink font-light italic leading-snug">
                  <EditableText
                    path={`${pathPrefix}.members.${i}.name`}
                    value={m.name}
                    as="span"
                  />
                </div>
                <div className="mt-3 text-xs text-navy tracking-wide uppercase">
                  <EditableText
                    path={`${pathPrefix}.members.${i}.standort`}
                    value={m.standort}
                    as="span"
                  />
                </div>
                <div className="mt-3 text-sm text-mute tracking-wide">
                  <EditableText
                    path={`${pathPrefix}.members.${i}.role`}
                    value={m.role}
                    as="span"
                  />
                </div>
                {m.bio && (
                  <EditableText
                    path={`${pathPrefix}.members.${i}.bio`}
                    value={m.bio}
                    as="p"
                    className="mt-6 text-sm text-ink-soft leading-relaxed flex-1"
                  />
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <EditableListAddButton
          path={`${pathPrefix}.members`}
          items={data.members}
          newItem={newMember}
          label="Mitglied hinzufügen"
          className="mt-8"
        />
      </div>
    </section>
  );
}
