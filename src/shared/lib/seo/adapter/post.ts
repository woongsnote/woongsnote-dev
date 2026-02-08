// src/lib/seo/adapters/post.ts
import type { PostEntry } from '@/shared/types/content/post';
import type { PostSeoSource } from '..';

export function postToSeoSource(post: PostEntry): PostSeoSource {
  return {
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    cover: post.data.cover, // Project면 존재, 아니면 undefined
  };
}
