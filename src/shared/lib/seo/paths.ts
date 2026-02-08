export const paths = {
  post: (slug: string) => `/${slug}`,
  category: (slug: string) => `/category/${slug}`,
} as const;
