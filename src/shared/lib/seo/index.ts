// src/lib/seo/index.ts
import { PAGES, type PageKey } from '@/shared/config/pages';
import { PAGE_META_OVERRIDES } from '@/shared/config/meta';
import { normalizeMeta } from './normalize';
import { defaultDescription, formatTitle } from './rules';
import { paths } from './paths';
import type { HeadMeta } from '@/shared/types/site/meta';

export type PostSeoSource = {
  slug: string;
  title: string;
  description: string;
  cover?: { src: string } | string;
  noIndex?: boolean;
};

function imageToUrl(image?: { src: string } | string): string | undefined {
  if (!image) return undefined;

  return typeof image === 'string' ? image : image.src;
}

export type CategorySeoSource = {
  slug: string;
  label: string;
  description?: string;
  ogImage?: string;
};

export const seo = {
  page(key: PageKey): HeadMeta {
    const page = PAGES[key];
    const o = PAGE_META_OVERRIDES[key];

    const title =
      key === 'home'
        ? formatTitle('', { isHome: true })
        : formatTitle(o.title ?? page.label);

    return normalizeMeta({
      title,
      description: defaultDescription(o.description),
      canonicalPath: page.path,
      ogImage: o.ogImage,
      robots: o.robots,
    });
  },

  post(post: PostSeoSource): HeadMeta {
    const coverUrl = imageToUrl(post.cover);

    return normalizeMeta({
      title: formatTitle(post.title),
      description: defaultDescription(post.description),
      canonicalPath: paths.post(post.slug),
      ogImage: coverUrl,
      robots: post.noIndex ? 'noindex, nofollow' : undefined,
    });
  },

  category(category: CategorySeoSource): HeadMeta {
    return normalizeMeta({
      title: formatTitle(category.label),
      description: defaultDescription(
        category.description ?? `${category.label} 글 모음`
      ),
      canonicalPath: paths.category(category.slug),
      ogImage: category.ogImage,
    });
  },
} as const;
