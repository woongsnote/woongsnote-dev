// search-modal.ts
// Pagefind 타입 정의

export interface PagefindSearchResult {
  id: string;
  url: string;
  excerpt: string;
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  content?: string;
  word_count?: number;
  filters?: Record<string, string[]>;
  anchors?: Array<{
    element: string;
    id: string;
    text: string;
    location: number;
  }>;
  weighted_locations?: Array<{
    weight: number;
    balanced_score: number;
    location: number;
  }>;
  locations?: number[];
  raw_content?: string;
  raw_url?: string;
  sub_results?: PagefindSearchResult[];
}

export interface PagefindSearchResponse {
  results: Array<{
    id: string;
    data: () => Promise<PagefindSearchResult>;
  }>;
  unfilteredResultCount: number;
  filters: Record<string, Record<string, number>>;
  totalFilters: Record<string, Record<string, number>>;
  timings: {
    preload: number;
    search: number;
    total: number;
  };
}

export interface PagefindInstance {
  search: (query: string, options?: {
    filters?: Record<string, string[]>;
    sort?: Record<string, 'asc' | 'desc'>;
  }) => Promise<PagefindSearchResponse>;
  
  options: (options: {
    baseUrl?: string;
    excerptLength?: number;
    mergeFilter?: Record<string, string>;
    highlightParam?: string;
    ranking?: {
      pageLength?: number;
      termFrequency?: number;
      termSaturation?: number;
      termSimilarity?: number;
    };
  }) => Promise<void>;
  
  filters: () => Promise<Record<string, Record<string, number>>>;
  
  preload: (term: string) => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindInstance;
  }
}

export {};