import type { PagefindAPI, PagefindSearchResult } from './pagefind.types';

let instance: PagefindAPI | null = null;

function baseUrl(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return base.endsWith('/') ? base : `${base}/`;
}

function isPagefindAPI(value: unknown): value is PagefindAPI {
  if (typeof value !== 'object' || value === null) return false;
  if (!('search' in value)) return false;
  return typeof (value as { search: unknown }).search === 'function';
}

async function loadPagefind(): Promise<PagefindAPI> {
  if (instance) return instance;

  const path = `${baseUrl()}pagefind/pagefind.js`;
  const mod = await import(path);

  const candidate: unknown = 'default' in mod ? mod.default : mod;

  if (!isPagefindAPI(candidate)) {
    throw new Error('Invalid Pagefind module shape');
  }

  instance = candidate;
  return instance;
}

export async function searchPagefind(
  term: string
): Promise<PagefindSearchResult[]> {
  const q = term.trim();
  if (!q) return [];

  const pf = await loadPagefind();
  const res = await pf.search(q);

  const handles = (res.results ?? []).slice(0, 10);
  const items = await Promise.all(handles.map((h) => h.data()));

  return items as unknown as PagefindSearchResult[];

}
