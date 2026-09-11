---
title: 'Contentlayer 블로그 만들기'
description: 'Next.js와 Contentlayer를 사용해서 블로그 템플릿 구현하기'
publishedDate: 2023-08-10
category: 'Tech'
author: 'woongsnote'
tags: ['Next.js', 'Blog']
slug: 'contentlayer-blog-setup'
---

Next.js와 ContentLayer로 블로그로 만들었던 과정을 `Blog template`을 만들면서, 정리해보려고 한다.

## 기술 스택

아래 기술들을 베이스로 사용해서 제작했다.

- `Next.js` , `TypeScript`, `TailwindCSS`, `ContentLayer`

## 구현 과정

### 1. 프로젝트 생성

```bash title="프로젝트 생성"
npx create-next-app@latest
```

```bash title="세부 설정"
What is your project named? mdx-blog
Would you like to use TypeScript? No / **Yes**
Would you like to use ESLint? No / **Yes**
Would you like to use Tailwind CSS? No / **Yes**
Would you like to use `src/` directory? **No** / Yes
Would you like to use App Router? (recommended) No / **Yes**
Would you like to customize the default import alias? **No** / Yes
```

### 2. 라이브러리 추가

    ```bash title="라이브러리"
    npm install contentlayer next-contentlayer date-fns
    ```

### 3. ContentLayer 설정하기

- ContentLayer를 사용하기 위해, `next.config.js` , `tsconfig.json`, 파일의 수정이 필요하다.

1. **next.config.js**

```jsx title="next.config.js"

**import { withContentlayer } from "next-contentlayer";**
/** @type {import('next').NextConfig} */
const nextConfig = {
  **reactStrictMode: true,
  swcMinify: true,**
};

**module.exports = withContentlayer(nextConfig);**
```

2. **tsconfig.json**

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".contentlayer/generated"
  ],
  "exclude": ["node_modules"]
}
```

추가로, 로컬에서 빌드한 결과물은 `GitHub`에 올라가지 않도록, `.gitignore` 파일에 아래 내용을 추가한다

```.gitignore title=".gitignore"
# contentlayer
.contentlayer
```

이제 루트(최상단) 디렉토리에 `contentlayer.config.ts` 파일을 만들어야 한다.

직접 만들어도 되고, 터미널에서 아래 명령어로 생성할 수도 있다.

```bash
touch contentlayer.config.ts
```

contentlayer.config.ts 파일의 구성은 아래와 같다

```tsx title="contentlayer.config.ts"
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });
```

### 4. 게시글 생성

이제 루트 디렉토리에 posts 폴더를 생성하고, 게시글을 작성해준다.

posts 폴더인 이유는 `contentDirPath: "posts"` 로 설정했기 때문이다.

```markdown
---
title: My First Post
date: 2023-08-10
---

This is My First Post!! :)
```

게시글을 날짜순으로 보여주기 위해, 서로 다른 날짜로 설정한 게시글들을 생성해준다.

```md
---
title: My First Post
date: 2023-08-08
---

## Test 1

This is My First Post 😀 Ha Ha Ha
```

```md
---
title: My Second Post
date: 2023-08-09
---

## Test 2

This is My Second Post 😀 Ha Ha Ha
```

```md
---
title: My Third Post
date: 2023-08-10
---

## Test 3

This is My Third Post 😀 Ha Ha Ha
```

### 5. 메인 페이지 구현

게시글까지 작성했으면, 게시글을 보여주기 위해 홈페이지(app 디렉토리의 `page.tsx`)
를 수정해야 한다.

```tsx title="app/page.tsx"
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      {posts.map((post) => (
        <h2 key={post._id}>{post.title}</h2>
      ))}
    </div>
  );
}
```

작성한 게시글 제목들의 목록이 보일 것이다.

### 6. Card 컴포넌트 구현

이제 제목만 보여주는 대신 각 게시글들을 보여줄 카드 컴포넌트를 만들어서 좀 더 꾸며보도록 하자.

app 디렉토리에 `components` 폴더를 생성하고, `PostCard.tsx` 파일을 생성한다.

```tsx title="components/PostCard.tsx"
import { Post } from '@/.contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export default function PostCard(post: Post): React.ReactElement {
  return (
    <div className="mb-4 flex flex-col rounded-lg border-2 p-2">
      <Link href={post.url} className="mb-1 text-3xl text-blue-500">
        {post.title}
      </Link>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  );
}
```

### 7. 메인 페이지 수정

page.tsx에도 제목을 추가하고, 스타일을 추가하도록 하자.

```tsx title="app/page.tsx"
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import PostCard from './components/PostCard';

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="mx-auto max-w-5xl">
      <h1 className="my-8 text-center text-3xl font-bold">
        Next.js & ContentLayer Blog Example
      </h1>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </main>
  );
}
```

### 8. 상세 페이지 구현

아직, 상세 페이지에 대한 코드를 작성하지 않아서, 각 Post를 클릭하면 **404 페이지**를 만나게 될 것이다.

이를 해결하기 위해 **상세 페이지**를 구현한다.

```tsx title="app/[slug]/page.tsx"
import { allPosts } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
};

export const generatedStaticParams = async () => {
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generatedMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose mx-auto">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {new Intl.DateTimeFormat('en-US').format(new Date(post.date))}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <MDXContent components={mdxComponents} />
    </article>
  );
}
```

### ※ 404 페이지 구현

※ Next.js에서 제공해주는 404 페이지가 마음에 들지 않아 커스텀하고 싶은 경우, app 디렉토리에 `not-found.tsx` 파일로 404 페이지를 직접 구현할 수도 있다.

- `not-found.tsx` 파일이 posts 폴더 안에 있는 경우, /posts 하위 경로에만 동작하고, 그 외의 경우는 app 디렉토리의 `not-found.tsx`가 동작한다.

```tsx title="app/not-found.tsx"
import Link from 'next/link';

export default function NotFound(): React.ReactElement {
  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col items-center justify-center">
      <h1 className="mb-10 text-center text-3xl text-orange-500">
        This Link is Not Valid
      </h1>
      <Link href="/" className="text-center text-blue-500">
        Go Home
      </Link>
    </div>
  );
}
```

### 9. 게시글에 스타일 추가

※ article의 style을 쉽게 하기 위해, \***\*`@tailwindcss/typography` 를 사용할 수 있다.**

사용하는 방법은 아래 명령어로 설치하고,

```tsx
npm install -D @tailwindcss/typography
```

**`tailwind.config.js` 에 해당 플러그인을 추가해준다.**

```js title="tailwind.config.js"
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    **require('@tailwindcss/typography'),**
    // ...
  ],
}
```

완료되면 `<article>` 의 className에 `prose`를 추가해주면 된다!

```tsx
<article className="prose mx-auto"> ... </article>
```

## 구현 결과

구현한 전체 템플릿은 아래 링크에서 확인할 수 있다.

- [바로가기](https://github.com/woongsnote/contentlayer-blog-template)
