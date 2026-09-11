---
title: MDX 블로그 구현하기
description: Astro와 Tailwind CSS를 사용해서 MDX 블로그를 구현하는 방법
publishedDate: 2024-03-22
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'MDX']
slug: 'astro-mdx-blog-setup'
---

## 개요

`Astro`와 `TailwindCSS`를 사용해서 `MDX` 블로그를 구현하는 방법을 단계별로 나눠 정리해보려고 한다.

## 구현 방법

### 1. Astro 프로젝트 생성

먼저, 터미널에서 `npm create astro@latest`로 Astro 프로젝트를 생성한다.

명령어를 실행하면, 아래와 같은 절차로 프로젝트를 생성할 수 있다.

    ```bash title="프로젝트 생성 순서"
      dir   Where should we create your new project?
            ./my-astro-blog

      tmpl   How would you like to start your new project?
            Empty

        ts   Do you plan to write TypeScript?
            Yes

      use   How strict should TypeScript be?
            Strict

      deps   Install dependencies?
            Yes

      git   Initialize a new git repository?
            Yes
    ```

각 질문에 대해 정리하면 아래와 같다.

1. create-astro를 설치할 지 물어보면, `y`를 눌러 설치

2. 설치가 완료되고, 프로젝트의 이름을 원하는 이름으로 입력한다. ex) my-blog

3. 템플릿은 `Use Empty`를 선택 - 프로젝트를 가볍게 구성하기 위함

4. dependencies를 설치할 지 물어보면 `y`를 입력

5. TypeScript 사용 - 프로젝트의 타입 안정성을 위해 `yes` 선택

6. TypeScript의 strict 설정 - 권장 사항에 맞춰 `strict` 선택

7. Install dependencies - 기본 패키지 설치를 위해 `yes` 선택 // `no`를 선택해도 추후 설치 가능

8. git repository 를 초기화할 지 결정 - 추후 배포를 위해 `init` 선택

9. 프로젝트가 문제 없이 생성되었는지 확인하기 위해, `VS Code`에서 방금 만든 폴더를 열고, `npm run dev` 명령어 실행(터미널에서 바로 Vs Cdoe 실행 명령어: `code .`)

정상적으로 실행되면, 프로젝트가 준비되었다.

### 2. Tailwind CSS 추가

반응형 디자인 및 빠른 스타일링을 위해 아래 명령어를 사용해서 `Tailwind CSS`를 설치한다.

직접 설치할 수도 있지만, Astro에서 제공해주는 `Integration`을 사용해서 설치하도록 하자.
터미널에서 `npx astro add tailwind` 로 설치하면 된다.

정상적으로 실행되면, 패키지가 설치되고, `tailwind.config.mjs` 파일까지 생성될 것이다.

※ 만약, 위의 명령어가 정상적으로 동작하지 않는다면, 직접 설치할 수도 있다.

TailwindCSS 설치가 완료되었다면, 블로그의 각 게시글 스타일링을 위해 `@tailwindcss/typography` 플러그인을 추가한다.

먼저, 라이브러리를 설치하고, `tailwind.config.mjs` 파일에 설치한 `typograpy` 플러그인을 추가한다.

    ```bash title="npm install typography"
    npm install -D @tailwindcss/typography
    ```

    ```js {7} title="tailwind.config.mjs"
    /** @type {import('tailwindcss').Config} */
    export default {
      content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
      theme: {
        extend: {},
      },
      plugins: [require('@tailwindcss/typography')],
    };
    ```

Tailwind가 잘 설치되었는지 확인하기 위해,`src/pages/indexe.astro`에서 h1에 class를 추가해서 테스트해본다.

※ Astro는 class 이름을 추가할 때, React와 같은 `className`이 아닌 `class`임을 주의하도록 한다.

```astro title="src/pages/index.astro"
---

---

<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <h1 class="text-3xl font-black text-blue-500">Astro</h1>
  </body>
</html>
```

### 3. `@astro/mdx` 추가

`MDX`파일 렌더링을 위해 `Astro`에서 제공하는 `@astro/mdx`를 설치한다.

    ```bash title="install mdx"
    npx astro add mdx
    ```

### 4. Content Collection 구성

`src` 폴더에 `content` 폴더를 생성하고, 그 안에 `blog` 폴더를 생성한다. `blog`폴더에 첫 게시글인 `my-first-post.mdx`파일을 생성한다.

※ `Content Collection`을 위한 예약어이기 때문에 `content`폴더를 생성해야 한다. `content` 폴더 하위에 생성하는 폴더 이름은 원하는 이름으로 생성해도 된다.

    ```text {2,3} title="src/content 폴더 경로"
    📦src
    ┣ 📂content
    ┃ ┗ 📂blog
    ┃ ┃ ┗ 📜my-first-post.mdx
    ┣ 📂pages
    ┃ ┗ 📜index.astro
    ┗ 📜env.d.ts
    ```

타입 안정성을 위해 `content` 폴더에 `config.ts` 파일을 생성한다.

    ```text {5} title="src/content/config.ts"
    📦src
    ┣ 📂content
    ┃ ┣ 📂blog
    ┃ ┃ ┗ 📜my-first-post.mdx
    ┃ ┗ 📜config.ts
    ┣ 📂pages
    ┃ ┣ 📂blog
    ┃ ┗ 📜index.astro
    ┗ 📜env.d.ts
    ```

`config.ts`의 내용은 아래와 같다.

```ts title="src/content/config.ts"
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      cover: image(),
      coverAlt: z.string().optional(),
      category: z.string(),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  blog: blogCollection,
};
```

※ `schema`를 여러 개 생성해야 한다면, 아래와 같이 `schemas` 폴더를 생성하고, 각 `schema`를 파일로 관리할 수도 있다.

```text title="schemas"
📦schemas
 ┣ 📜blogSchema.ts
 ┗ 📜projectSchema.ts
```

### 5. 첫 번째 게시글 렌더링

화면에 보여줄 첫 번째 게시글을 작성한다.

```mdx title="my-first-post.mdx"
---
title: 첫 번째 게시글
description: 첫 번째 게시글입니다.
cover: '../../assets/blog-placeholder.jpg'
publishedDate: 2024-03-22
category: 'Tech'
tags: ['Astro', 'MDX', 'TailwindCSS']
---

첫 번째 게시글입니다.
```

※ src 폴더에 `assets` 폴더를 만들고, `thumbnail`에 사용할 이미지를 추가한다. 만약 `content` 폴더 안에 이미지를 담는다면, `cover: "./blog-placeholder.jpg"`와 같이 수정할 수 있다.

게시글 작성이 완료되면, `pages/blog`폴더에, `[...slug].astro` 파일을 생성한다.

```text
📦pages
 ┣ 📂blog
 ┃ ┗ 📜[...slug].astro
```

`[...slug].astro` 파일의 내용은 아래와 같다.

```astro title="src/pages/blog/[...slug].astro"
---
import type { GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = (async () => {
  const blogEntries = await getCollection('blog');

  return blogEntries.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content } = await post.render();
---

<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <Content />
  </body>
</html>
```

※ 만약, `<head>` 부분이 없이 `<Content />`만 입력하면 한글이 깨지는 현상을 볼 수 있을 것이다.

`index.astro`와 공통인 부분을 해당 부분을 `layouts` 폴더에 `BaseLayout.astro` 파일로 분리한다. 분리한 파일들의 코드는 아래와 같다.

```astro title="src/layouts/BaseLayout.astro"
---

---

<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <main>
      <slot />
    </main>
  </body>
</html>
```

`<slot/>`이 보통 React에서 사용하는 `children` 역할을 한다.

BaseLayout를 import해서 `index.astro`와 `[slug].astro`에 적용하면, 아래와 같이 변경된다.

```astro title="index.astro"
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <h1 class="text-3xl font-black text-blue-500">Astro</h1>
</BaseLayout>
```

```astro title="[...slug].astro"
---
import type { GetStaticPaths } from 'astro';
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

type Props = {
  post: CollectionEntry<'blog'>;
};

export const getStaticPaths = (async () => {
  const blogPosts = await getCollection('blog');

  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content } = await post.render();
const { title, description, cover } = post.data;
---

<BaseLayout>
  <article>
    <h1>{title}</h1>
    <p>{description}</p>
    <Image
      src={cover}
      alt={title}
      class="mx-auto block rounded-lg object-cover object-center"
      width={300}
      height={300}
    />
    <div>
      <Content />
    </div>
  </article>
</BaseLayout>
```

### 6. 게시글 목록 렌더링

게시글 목록을 만들기 위해, `blog` 폴더에 새로운 MDX 파일을 추가한다.

```text
📦blog
 ┣ 📜my-first-post.mdx
 ┣ 📜my-second-post.mdx
 ┗ 📜my-third-post.mdx
```

게시글 목록을 가져오기 위해 `index.astro`를 아래와 같이 수정한다.

```astro title="src/pages/index.astro"
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const allPosts = await getCollection('blog');
---

<BaseLayout>
  <ul>
    {
      allPosts.map((post) => (
        <li>
          <a href={`/blog/${post.slug}`}>{post.data.title}</a>
        </li>
      ))
    }
  </ul>
</BaseLayout>
```

### 7. 디자인 수정하기

BaseLayout에 Tailwind class를 추가해서, 디자인을 수정한다.

```astro title="BaseLayout.astro"
---

---

<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <main class="mx-auto max-w-5xl p-2">
      <slot />
    </main>
  </body>
</html>
```

게시글의 경우, Tailwind CSS의 `Typography` 플러그인를 사용하기 위해, `<article>`에 `prose` class를 추가해준다.

```astro {27} title="[slug].astro"
---
import type { GetStaticPaths } from 'astro';
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

type Props = {
  post: CollectionEntry<'blog'>;
};

export const getStaticPaths = (async () => {
  const blogPosts = await getCollection('blog');

  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content } = await post.render();
const { title, description, cover } = post.data;
---

<BaseLayout>
  <article class="prose mx-auto">
    <h1>{title}</h1>
    <p>{description}</p>
    <Image
      src={cover}
      alt={title}
      class="mx-auto block rounded-lg object-cover object-center"
      width={300}
      height={300}
    />
    <div>
      <Content />
    </div>
  </article>
</BaseLayout>
```

그 외에 바꾸고 싶은 스타일이 있는 경우, 수정을 진행하도록 하자.

### 8. rehype-pretty-code 추가

게시글을 작성하다 보면, Code Block을 추가해야 하는데, Code Block의 커스터마이징을 위해 `rehype-pretty-code`를 사용하려고 한다.
`npm install rehype-pretty-code`로 설치해준다.

패키지가 설치되고 나면, `astro.config.mjs`에 추가해주도록 하자.

```js {4, 10-20} title="astro.config.mjs"
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'one-dark-pro',
          },
        ],
      ],
    }),
  ],
});
```

※ 다크모드와 라이트모드의 테마를 다르게 지정하는 것도 가능하다.

### 9. Metadata 설정

Metadata 관리를 위해, `src`에 `components` 폴더를 만들고, `Metadata.astro` 파일을 생성하자.
`Metadata.astro`의 코드는 아래와 같다.

```astro title="Metadata.astro"
---
type Props = {
  title: string;
  description: string;
  image: string;
};

const { title, description, image } = Astro.props;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.png" />
<meta name="generator" content={Astro.generator} />
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.url)} />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image, Astro.url)} />
```

생성한 Metadata.astro 파일을 `BaseLayout`에서 `import` 해준다.

```astro {2, 15} title="BaseLayout.astro"
---
import Metadata from '../components/Metadata.astro';

type Props = {
  title: string;
  description: string;
  image: string;
};

const { title, description, image } = Astro.props;
---

<html>
  <head>
    <Metadata title={title} description={description} image={image} />
  </head>
  <body>
    <main class="mx-auto max-w-5xl p-2">
      <slot />
    </main>
  </body>
</html>
```

### 10. 빌드 및 배포

오류가 없는지 확인하기 위해, 빌드해서 실행해보도록 하자.
아래 명령어로, 빌드를 진행할 수 있다.

```bash
npm run build
```

※ 빌드 단계에서 문제가 있는지 미리 확인해서 배포해야 한다. Dev 모드에서 정상적으로 동작하더라도, Production 모드에서 오류가 생길 수 있기 때문이다.

빌드가 정상적으로 완료된다면, 프로젝트를 배포할 준비가 끝났다.

사용하고 싶은 플랫폼(ex. Vercel, Netlify, github-pages)을 이용해서, 배포를 진행하면 된다.

## 구현 결과

최종 완성된 소스 코드는 <a href="https://github.com/woongsnote/minimal-astro-blog" target="_blank">minimal-astro-blog</a>에서 볼 수 있다.
