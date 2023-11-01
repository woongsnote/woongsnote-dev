import { Post } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';

export function getSortedPostList(post: Post[], maxNum?: number) {
  const sortedPosts = post
    .filter((post) => post.isPublished)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return maxNum ? sortedPosts.slice(0, maxNum) : sortedPosts;
}

export function getPostsByTag({ tag, posts }: { tag: string; posts: Post[] }) {
  if (tag === '전체' || !tag) return posts;

  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostThumbnail(title: string): string {
  return `${process.env.BASE_URL}/og?title=${title}`;
}

export function getAllTagsFromPost(arrays: Post[]): string[] {
  const set: Set<string> = new Set();
  set.add('전체');
  arrays.map((post) => {
    const tagList = post.tags;
    tagList.forEach((tag) => {
      set.add(tag);
    });
  });
  return Array.from(set);
}
