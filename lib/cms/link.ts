import type { LinkRef } from "@/types/content";

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  team: "/team",
  termin: "/termin",
  arbeitgeber: "/arbeitgeber",
  ratgeber: "/ratgeber",
};

export function resolveLinkRef(ref: LinkRef | undefined | null): string {
  if (!ref) return "#";
  switch (ref.kind) {
    case "treatment":
      return `/behandlungen/${ref.slug}`;
    case "location":
      return `/standorte/${ref.slug}`;
    case "pillar":
      return `/ratgeber/${ref.slug}`;
    case "page":
      return PAGE_PATHS[ref.slug] ?? "/";
    case "external":
      return ref.href;
    default:
      return "#";
  }
}

export function isExternal(ref: LinkRef | undefined | null): boolean {
  return !!ref && ref.kind === "external" && /^https?:\/\//.test(ref.href);
}
