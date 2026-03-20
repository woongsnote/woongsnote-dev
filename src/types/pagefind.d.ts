// src/types/pagefind.d.ts
export interface PagefindSearchResult {
  id: string;
  url: string;
  excerpt: string;
  meta?: { title?: string; description?: string; image?: string };
  content?: string;
  word_count?: number;
  sub_results?: PagefindSearchResult[];
}

export interface PagefindSearchResponse {
  results: Array<{ id: string; data: () => Promise<PagefindSearchResult> }>;
  unfilteredResultCount: number;
}

export interface PagefindInstance {
  search: (
    query: string,
    options?: { filters?: Record<string, string[]> }
  ) => Promise<PagefindSearchResponse>;
  options: (options: { excerptLength?: number }) => Promise<void>;
  preload: (term: string) => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindInstance;
  }
}

export {};
