"use client";

import Link from "next/link";
import { useLocale } from "@/components/cms/LocaleProvider";
import { resolveLinkRef, isExternal } from "@/lib/cms/link";
import { withLocale } from "@/lib/cms/locale-path";
import type { LinkRef } from "@/types/content";

type Props = {
  linkRef: LinkRef | undefined | null;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
};

export function LinkRefLink({ linkRef, children, className, prefetch }: Props) {
  const locale = useLocale();
  const rawHref = resolveLinkRef(linkRef);
  if (isExternal(linkRef)) {
    return (
      <a
        href={rawHref}
        className={className}
        target={rawHref.startsWith("http") ? "_blank" : undefined}
        rel={rawHref.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  }
  const href = withLocale(rawHref, locale);
  return (
    <Link href={href} className={className} prefetch={prefetch}>
      {children}
    </Link>
  );
}
