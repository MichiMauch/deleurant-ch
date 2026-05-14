import { EditableRichText } from "@/components/cms/EditableRichText";
import type { RichTextData } from "@/types/content";

export function RichTextBlock({ data, pathPrefix }: { data: RichTextData; pathPrefix: string }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[820px] px-6 lg:px-10">
        <EditableRichText
          path={`${pathPrefix}.html`}
          value={data.html}
          className="prose-deleurant"
        />
      </div>
    </section>
  );
}
