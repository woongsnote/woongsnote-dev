/* ── Pagefind types ─────────────────────────────────── */

/** search() 가 돌려주는 handle – data() 호출 전 */
export interface PagefindResultHandle {
  id: string;
  data: () => Promise<PagefindResultData>;
}

/** data() 호출 후 실제 검색 결과 */
export interface PagefindResultData {
  url: string;
  excerpt: string;
  meta?: Record<string, string>;
}

interface PagefindSearchResponse {
  results: PagefindResultHandle[];
}

interface PagefindAPI {
  search: (term: string) => Promise<PagefindSearchResponse>;
}

/* ── Pagefind client ───────────────────────────────── */

let instance: PagefindAPI | null = null;

async function load(): Promise<PagefindAPI> {
  if (instance) return instance;
  const url = new URL('/pagefind/pagefind.js', window.location.origin).href;
  const mod = await import(/* @vite-ignore */ url);
  const api: unknown = 'default' in mod ? mod.default : mod;

  if (!api || typeof (api as Record<string, unknown>).search !== 'function') {
    throw new Error('Invalid Pagefind module');
  }

  instance = api as PagefindAPI;
  return instance;
}

export async function searchPagefind(
  term: string
): Promise<PagefindResultData[]> {
  const q = term.trim();
  if (!q) return [];

  const pf = await load();
  const { results } = await pf.search(q);

  return Promise.all(results.slice(0, 10).map((h) => h.data()));
}
