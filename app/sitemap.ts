import { Post, Project, allPosts, allProjects } from 'contentlayer/generated';
import { MetadataRoute } from 'next';
import { getSortedDataList } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.woongsnote.dev';

  const posts: Post[] = getSortedDataList(allPosts);
  const projects: Project[] = getSortedDataList(allProjects);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...postUrls,
    ...projectUrls,
  ];
}
