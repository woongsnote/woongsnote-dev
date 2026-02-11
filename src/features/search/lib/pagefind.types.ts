export interface PagefindSearchOptions {
  filters?: Record<string, string | string[]>;
}

export interface PagefindSearchResultData {
  url: string;
  excerpt: string;
  meta?: Record<string, string>;
}

export interface PagefindSearchResult {
  id: string;
  url: string;
  excerpt: string;
  meta?: Record<string, string>;
  data: () => Promise<PagefindSearchResultData>;
}

export interface PagefindSearchResponse {
  results: PagefindSearchResult[];
}

export interface PagefindAPI {
  search: (
    term: string,
    options?: PagefindSearchOptions
  ) => Promise<PagefindSearchResponse>;
}
