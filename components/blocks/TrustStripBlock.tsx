import { EditableText } from "@/components/cms/EditableText";
import {
  EditableListAddButton,
  EditableListRemoveButton,
} from "@/components/cms/EditableListControls";
import type { TrustStripData, TrustStripItem } from "@/types/content";

export function TrustStripBlock({ data, pathPrefix }: { data: TrustStripData; pathPrefix: string }) {
  const newItem: TrustStripItem = { kpi: "Neu", label: "Beschreibung" };
  return (
    <section aria-label="Vertrauen" className="border-y border-line-soft">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-line-soft -mx-6 lg:-mx-10">
          {data.items.map((item, i) => (
            <li
              key={i}
              className="group relative px-6 lg:px-10 py-8 lg:py-10 flex flex-col gap-1"
            >
              <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <EditableListRemoveButton
                  path={`${pathPrefix}.items`}
                  items={data.items}
                  index={i}
                  confirmLabel={`KPI „${item.kpi}"`}
                />
              </span>
              <EditableText
                path={`${pathPrefix}.items.${i}.kpi`}
                value={item.kpi}
                as="span"
                className="serif text-xl lg:text-2xl text-ink font-light"
              />
              <EditableText
                path={`${pathPrefix}.items.${i}.label`}
                value={item.label}
                as="span"
                className="text-xs tracking-wide text-mute"
              />
            </li>
          ))}
        </ul>
        <EditableListAddButton
          path={`${pathPrefix}.items`}
          items={data.items}
          newItem={newItem}
          label="KPI hinzufügen"
          className="px-6 lg:px-10 py-4"
        />
      </div>
    </section>
  );
}
