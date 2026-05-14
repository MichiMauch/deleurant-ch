import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionItem, readContent } from "@/lib/cms/content";
import { getRequestLocale } from "@/lib/cms/request-locale";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { BlockManager } from "@/components/blocks/BlockManager";

export async function generateStaticParams() {
  const content = await readContent();
  return content.collections.standorte.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const { content, item } = await getCollectionItem("standorte", slug, locale);
  if (!item) return {};
  return {
    title: item.seo?.title ?? content.seo.title,
    description: item.seo?.description ?? content.seo.description,
  };
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const { item, index } = await getCollectionItem("standorte", slug, locale);
  if (!item) notFound();
  const scope = `collections.standorte.${index}.sections`;
  return (
    <>
      <BlockRenderer sections={item.sections} scope={scope} />
      <BlockManager sections={item.sections} locale={locale} scope={scope} />
    </>
  );
}
