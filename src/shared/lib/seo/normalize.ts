// src/lib/seo/normalize.ts
import { siteConfig } from '@/shared/config/site';
import type { HeadMetaInput, HeadMeta } from '@/shared/types/site/meta';

function toAbsoluteUrl(urlOrPath: string): string {
  // 이미 absolute면 그대로
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  return new URL(urlOrPath, siteConfig.url).toString();
}

export function normalizeMeta(input: HeadMetaInput): HeadMeta {
  return {
    title: input.title,
    description: input.description,
    canonicalUrl: toAbsoluteUrl(input.canonicalPath),
    ogImageUrl: toAbsoluteUrl(input.ogImage ?? siteConfig.defaultOgImage),
    robots: input.robots,
  };
}
