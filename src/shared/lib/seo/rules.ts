// src/lib/seo/rules.ts
import { siteConfig } from '@/shared/config/site';

export function formatTitle(
  title: string,
  opts?: { isHome?: boolean }
): string {
  if (opts?.isHome) return siteConfig.name;
  return `${title} | ${siteConfig.name}`;
}

export function defaultDescription(description?: string): string {
  return description ?? siteConfig.description;
}
