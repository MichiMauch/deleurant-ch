"use client";

import Link from "next/link";
import { resolveLinkRef, isExternal } from "@/lib/cms/link";
import type { LinkRef } from "@/types/content";

type Props = {
  linkRef: LinkRef | undefined | null;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
};

export function LinkRefLink({ linkRef, children, className, prefetch }: Props) {
  const href = resolveLinkRef(linkRef);
  if (isExternal(linkRef)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} prefetch={prefetch}>
      {children}
    </Link>
  );
}
