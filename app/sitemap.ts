import { allPosts, allProjects } from 'contentlayer/generated';
import { MetadataRoute } from 'next';
import { getSortedDataList } from 'app/utils/getData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.woongsnote.dev';

  const posts = getSortedDataList(allPosts);
  const projects = getSortedDataList(allProjects);

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
