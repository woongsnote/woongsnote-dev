import { allPosts } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

const baseUrl = process.env.BASE_URL!;
export default function sitemap(): MetadataRoute.Sitemap {
  const postUrls: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/posts/${post.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postUrls,
  ];
}
