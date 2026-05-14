/**
 * In-place transformer: collapses split headlines into a single `headline` HTML field.
 *
 *   { title: "Was möchten Sie", italicTail: "erreichen?" }
 *   → { headline: "Was möchten Sie<br><em>erreichen?</em>" }
 *
 *   (DoctorSpotlight only)
 *   { name: "Dr. med. dent.", italicName: "Yann Deleurant" }
 *   → { headline: "Dr. med. dent.<br><em>Yann Deleurant</em>" }
 *
 * Run with: npx tsx scripts/migrate-headlines.ts
 * Idempotent — if `headline` already exists on a section, it is left alone.
 */
import fs from "node:fs/promises";
import path from "node:path";

type AnyRecord = Record<string, unknown>;

function escapeHtml(s: string): string {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function combine(title: string, italicTail?: string): string {
  const head = escapeHtml(title);
  if (!italicTail || italicTail.trim() === "") return head;
  return `${head}<br><em>${escapeHtml(italicTail)}</em>`;
}

function migrateSectionData(type: string, data: AnyRecord): boolean {
  if (typeof data !== "object" || data === null) return false;
  if (typeof data.headline === "string") return false; // already migrated

  // DoctorSpotlight: name + italicName
  if (type === "DoctorSpotlight") {
    if (typeof data.name === "string") {
      data.headline = combine(
        data.name as string,
        typeof data.italicName === "string" ? (data.italicName as string) : undefined,
      );
      delete data.name;
      delete data.italicName;
      return true;
    }
    return false;
  }

  // Everything else with title + italicTail
  if (typeof data.title === "string") {
    data.headline = combine(
      data.title as string,
      typeof data.italicTail === "string" ? (data.italicTail as string) : undefined,
    );
    delete data.title;
    delete data.italicTail;
    return true;
  }

  return false;
}

type Section = { id?: string; type?: string; data?: AnyRecord };

function migrateSections(sections: unknown): number {
  if (!Array.isArray(sections)) return 0;
  let count = 0;
  for (const s of sections as Section[]) {
    if (!s || typeof s !== "object") continue;
    if (typeof s.type !== "string" || !s.data) continue;
    if (migrateSectionData(s.type, s.data)) count += 1;
  }
  return count;
}

async function migrateFile(file: string): Promise<{ file: string; changed: number }> {
  const raw = await fs.readFile(file, "utf-8");
  const content = JSON.parse(raw) as AnyRecord;
  let changed = 0;

  // pages.{key}.sections
  const pages = content.pages as Record<string, { sections?: unknown }> | undefined;
  if (pages) {
    for (const key of Object.keys(pages)) {
      changed += migrateSections(pages[key]?.sections);
    }
  }

  // collections.{key}[].sections
  const collections = content.collections as
    | Record<string, Array<{ sections?: unknown }>>
    | undefined;
  if (collections) {
    for (const key of Object.keys(collections)) {
      const list = collections[key];
      if (!Array.isArray(list)) continue;
      for (const item of list) {
        changed += migrateSections(item?.sections);
      }
    }
  }

  if (changed > 0) {
    await fs.writeFile(file, JSON.stringify(content, null, 2) + "\n", "utf-8");
  }
  return { file, changed };
}

async function main() {
  const dir = path.join(process.cwd(), "messages");
  const entries = await fs.readdir(dir);
  const files = entries.filter((f) => f.endsWith(".json")).map((f) => path.join(dir, f));
  if (files.length === 0) {
    console.log("No locale JSON files found in messages/.");
    return;
  }
  for (const file of files) {
    const { changed } = await migrateFile(file);
    console.log(`${changed === 0 ? "·" : "✓"} ${path.relative(process.cwd(), file)} — ${changed} sections migrated`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
