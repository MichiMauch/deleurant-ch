import "server-only";
import fs from "node:fs/promises";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { messagesPath } from "@/i18n/locales.server";
import type { CollectionItem, CollectionKey, LocaleContent, PageKey } from "@/types/content";

export async function readContent(locale: string = DEFAULT_LOCALE): Promise<LocaleContent> {
  const raw = await fs.readFile(messagesPath(locale), "utf-8");
  return JSON.parse(raw) as LocaleContent;
}

export function contentPath(locale: string = DEFAULT_LOCALE): string {
  return messagesPath(locale);
}

export async function getPage(key: PageKey, locale: string = DEFAULT_LOCALE) {
  const content = await readContent(locale);
  return { content, page: content.pages[key] };
}

export async function getCollectionItem(
  collection: CollectionKey,
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Promise<{
  content: LocaleContent;
  item: CollectionItem | undefined;
  index: number;
}> {
  const content = await readContent(locale);
  const list = content.collections[collection];
  const index = list.findIndex((i) => i.slug === slug);
  return {
    content,
    item: index >= 0 ? list[index] : undefined,
    index,
  };
}
