import type { Metadata } from "next";
import { getPage } from "@/lib/cms/content";
import { getRequestLocale } from "@/lib/cms/request-locale";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { BlockManager } from "@/components/blocks/BlockManager";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { content, page } = await getPage("arbeitgeber", locale);
  return {
    title: page.seo?.title ?? content.seo.title,
    description: page.seo?.description ?? content.seo.description,
  };
}

export default async function ArbeitgeberPage() {
  const locale = await getRequestLocale();
  const { page } = await getPage("arbeitgeber", locale);
  const scope = "pages.arbeitgeber.sections";
  return (
    <>
      <BlockRenderer sections={page.sections} scope={scope} />
      <BlockManager sections={page.sections} locale={locale} scope={scope} />
    </>
  );
}
