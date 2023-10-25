import { getAllPosts } from '@/lib/notion';
import { TPost } from '@/types';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<
  {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never'
      | undefined;
    priority?: number | undefined;
  }[]
> {
  const baseUrl = 'https://www.woongsnote.dev';
  const posts: TPost[] = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: baseUrl, lastModified: new Date() }, ...postUrls];
}
