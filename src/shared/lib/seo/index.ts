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

export type CategorySeoSource = {
  slug: string;
  label: string;
  description?: string;
  ogImage?: string;
};

function imageToUrl(image?: { src: string } | string): string | undefined {
  if (!image) return undefined;

  return typeof image === 'string' ? image : image.src;
}

const DEFAULT_ROBOTS = 'index, follow' as const;

const DEFAULT_OG_IMAGE: string | undefined = '/opengraph-image.png';

//  키 기반 기본 noindex (요청: archive 포함 + 404)
const NOINDEX_PAGE_KEYS = new Set<PageKey>(['archive', 'notFound']);

function robotsForPage(key: PageKey, override?: string): string | undefined {
  if (override) return override;
  if (NOINDEX_PAGE_KEYS.has(key)) return 'noindex, follow';
  return DEFAULT_ROBOTS;
}

type BuildInput = {
  title: string;
  description?: string;
  canonicalPath: string; // "/about" 같은 path
  ogImage?: string; // "/og.png" 같은 path 또는 absolute
  robots?: string;
};

function buildMeta(input: BuildInput): HeadMeta {
  return normalizeMeta({
    title: input.title,
    description: defaultDescription(input.description),
    canonicalPath: input.canonicalPath,
    ogImage: input.ogImage ?? DEFAULT_OG_IMAGE,
    robots: input.robots ?? DEFAULT_ROBOTS,
  });
}

export const seo = {
  page(key: PageKey): HeadMeta {
    const page = PAGES[key];
    const o = PAGE_META_OVERRIDES[key] ?? {};

    const title =
      key === 'home'
        ? formatTitle('', { isHome: true })
        : formatTitle(o.title ?? page.label);

    return buildMeta({
      title,
      description: o.description,
      canonicalPath: page.path, // ✅ path로 넘김 → normalizeMeta가 absolute 처리
      ogImage: o.ogImage,
      robots: robotsForPage(key, o.robots),
    });
  },

  post(post: PostSeoSource): HeadMeta {
    const coverUrl = imageToUrl(post.cover);

    return buildMeta({
      title: formatTitle(post.title),
      description: post.description,
      canonicalPath: paths.post(post.slug),
      ogImage: coverUrl,
      robots: post.noIndex ? 'noindex, nofollow' : DEFAULT_ROBOTS,
    });
  },

  category(category: CategorySeoSource): HeadMeta {
    return buildMeta({
      title: formatTitle(category.label),
      description: category.description ?? `${category.label} 글 모음`,
      canonicalPath: paths.category(category.slug),
      ogImage: category.ogImage,
      robots: DEFAULT_ROBOTS,
    });
  },
} satisfies {
  page: (key: PageKey) => HeadMeta;
  post: (post: PostSeoSource) => HeadMeta;
  category: (category: CategorySeoSource) => HeadMeta;
};
