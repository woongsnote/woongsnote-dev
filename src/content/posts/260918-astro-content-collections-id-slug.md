---
title: 'Astro에서 custom slug를 쓰는 이유'
description: 'AI cleanup 과정에서 다시 확인한 custom slug와 permalink'
publishedDate: 2026-09-18
category: 'Tech'
tags: ['Astro']
slug: astro-content-collections-id-slug
---

블로그 cleanup을 하면서 GPT에게 불필요한 `frontmatter`와 미사용 항목을 찾아달라고 했다.

이전 리팩토링에서 정리했던 `author`, `readingTime` 등과 함께 `slug`도 삭제 후보에 들어갔다. 이유는 코드에서 `post.data.slug`를 직접 사용하는 곳이 없다는 것이었다.

실제로 라우트에서 사용하는 값도 `post.id`다.

하지만 이 커스텀 `slug`는 이전에 직접 마이그레이션하면서 이미 용도를 확인했던 값이었다.

현재 구조에서는 `frontmatter`의 `slug`가 최종 `post.id`가 되고, 그 값이 `permalink`에 사용된다.

그래서 slug가 삭제 후보에 포함된 게 이상했다.

## 파일명에서 URL까지

게시물은 기본 `glob()` loader로 읽고 있다.

```ts
const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
  }),
  schema: postSchema,
});
```

frontmatter의 `slug`를 custom ID로 사용할 수 있다는 동작은 [Astro 공식 문서 — Custom IDs](https://docs.astro.build/en/guides/content-collections/#defining-custom-ids)에서 확인할 수 있다.

현재 이 글의 파일명은 다음과 같다.

```text
260918-astro-content-collections-id-slug.md
```

frontmatter에는 날짜를 제외한 `slug`를 지정해 두었다.

```yaml
slug: astro-content-collections-id-slug
```

라우트에서는 `post.id`를 그대로 URL 파라미터로 사용한다.

```ts
return posts.map((post) => ({
  params: { slug: post.id },
}));
```

결과는 다음과 같다.

| 상태        | 최종 `post.id`                             | 생성되는 URL                                |
| ----------- | ------------------------------------------ | ------------------------------------------- |
| `slug` 유지 | `astro-content-collections-id-slug`        | `/astro-content-collections-id-slug`        |
| `slug` 제거 | `260918-astro-content-collections-id-slug` | `/260918-astro-content-collections-id-slug` |

파일명에는 날짜를 남겨 관리하고, URL에서는 날짜를 빼기 위해 custom `slug`를 사용한다.

작업 결과를 빌드 성공 여부만으로 확인하는 것도 부족하다. URL이 바뀐 상태로도 빌드는 정상적으로 끝날 수 있기 때문이다.

## AI가 정리한 결과를 그대로 받아들이면 안 되는 이유

이번에는 `slug`의 역할을 이미 알고 있었기 때문에 삭제 제안을 그대로 적용하지 않았다.

반대로 구조를 모르는 상태에서 AI에게 cleanup을 맡기고 결과를 그대로 받아들였다면, 기존 URL을 바꾸는 수정이 들어갈 수도 있었다.

AI를 이용하면 코드 정리 속도는 빨라진다. 하지만 cleanup처럼 기존 동작을 유지해야 하는 작업에서는 결과를 그대로 받아들이기보다 직접 검증하는 과정이 필요하다.

**AI가 정리한 결과보다 중요한 건, 그 결과를 검증할 수 있는 기본 지식이었다.**
