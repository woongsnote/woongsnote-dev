# 기술 블로그

| **개발** 관련 학습한 지식들과 직접 구현한 프로젝트들을 공유하기 위해 구현한 **기술 블로그**입니다.

처음 블로그 개발을 시작했을 때는, `Next.js`와 `Contentlayer`의 조합으로 구현했습니다.

현재는 [`Astro`](https://astro.build) 기반으로 개발 및 운영 중입니다.

---

## ⚒️ 기술 스택

- 시작: `Next.js`, `TypeScript`, `Tailwind CSS`, `Contentlayer`

- 현재: `Astro`, `TypeScript`, `Tailwind CSS`

---

## 🗃️ 주요 기능

- [x] `Tailwind CSS` 기반으로 반응형 UI 구현.
- [x] `SEO` 적용.
- [x] `Light` / `Dark` Mode 지원.
- [x] `Giscus`를 통해 게시글에 대한 댓글 기능 지원.

---

## 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Card
 ┃ ┃ ┣ 📜Card.astro
 ┃ ┃ ┣ 📜CardBody.astro
 ┃ ┃ ┣ 📜CardFooter.astro
 ┃ ┃ ┣ 📜CardHeader.astro
 ┃ ┃ ┣ 📜CardImage.astro
 ┃ ┃ ┗ 📜Category.astro
 ┃ ┣ 📂Common
 ┃ ┃ ┣ 📜BaseHead.astro
 ┃ ┃ ┣ 📜FormattedDate.astro
 ┃ ┃ ┣ 📜ProfileImage.astro
 ┃ ┃ ┗ 📜SocialLinks.astro
 ┃ ┣ 📂Footer
 ┃ ┃ ┗ 📜Footer.astro
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.astro
 ┃ ┃ ┣ 📜Logo.astro
 ┃ ┃ ┣ 📜Navigation.astro
 ┃ ┃ ┗ 📜NavLink.astro
 ┃ ┣ 📂Hero
 ┃ ┃ ┣ 📜Bio.astro
 ┃ ┃ ┣ 📜Hero.astro
 ┃ ┃ ┗ 📜TechStack.astro
 ┃ ┣ 📂Page
 ┃ ┃ ┣ 📜PageHeader.astro
 ┃ ┃ ┣ 📜Pagination.astro
 ┃ ┃ ┗ 📜ViewMore.astro
 ┃ ┣ 📂Post
 ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┣ 📜PostThumbnail.astro
 ┃ ┃ ┣ 📜ReadingTimeText.astro
 ┃ ┃ ┣ 📜TagItem.astro
 ┃ ┃ ┗ 📜TagList.astro
 ┃ ┗ 📂Theme
 ┃ ┃ ┣ 📜ThemeButton.astro
 ┃ ┃ ┗ 📜ThemeSwitcher.astro
 ┣ 📂config
 ┃ ┗ 📜site-config.ts
 ┣ 📂content
 ┃ ┣ 📂posts
 ┃ ┣ 📂projects
 ┃ ┣ 📂schemas
 ┃ ┃ ┣ 📜blogSchema.ts
 ┃ ┃ ┗ 📜projectSchema.ts
 ┃ ┗ 📜config.ts
 ┣ 📂icons
 ┣ 📂layouts
 ┃ ┣ 📜Article.astro
 ┃ ┣ 📜Base.astro
 ┃ ┣ 📜Cards.astro
 ┃ ┣ 📜Posts.astro
 ┃ ┗ 📜Projects.astro
 ┣ 📂pages
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📂[slug]
 ┃ ┃ ┃ ┗ 📜index.astro
 ┃ ┃ ┗ 📜[...page].astro
 ┃ ┣ 📂projects
 ┃ ┃ ┣ 📂[slug]
 ┃ ┃ ┃ ┗ 📜index.astro
 ┃ ┃ ┗ 📜[...page].astro
 ┃ ┣ 📂tags
 ┃ ┃ ┗ 📂[tag]
 ┃ ┣ 📜404.astro
 ┃ ┣ 📜about.astro
 ┃ ┣ 📜index.astro
 ┃ ┗ 📜rss.xml.js
 ┣ 📂styles
 ┃ ┗ 📜global.css
 ┣ 📂utils
 ┃ ┗ 📜data-util.ts
 ┗ 📜env.d.ts
```

## 🖥️ 구현 결과

- [사이트 링크](https://www.woongsnote.dev)

## 💡 트러블 슈팅 in Next.js

### MDX Rendering - `ContentLayer` 적용

- `MDX`로 작성한 게시글을 보여줄 방법을 고민하던 중, `ContentLayer`라는 컨텐츠 관리 도구를 알게 되었습니다. `Next.js` 프로젝트에 적용하는 [방법](https://contentlayer.dev/docs/environments/nextjs-dcf8e39e) 이 공식 홈페이지에 잘 설명되어 있어, 이를 토대로 **블로그**에 적용했습니다.

### Routing 변경 - `App Router` 적용

- 처음 블로그를 만들기 시작했을 때는 Next.js의 버전이 **12**버전이었고, Pages Router 방식만 존재했습니다. Next.js의 Major 버전이 **12**버전에서 **13**버전으로 Major 업데이트가 진행되고, `App Router` 방식이 등장했습니다. 초기에는 공식 홈페이지에서 이 방식을 production에 사용하는 것을 권장하지 않았기 때문에, App Router 방식으로 변경하는 방법에 관해 dev Branch에서 학습만 진행했습니다. `**Next.js 13.4**` 버전에서부터 App Router 방식이 Stable로 변경되어, 해당 Router방식을 **[블로그](https://woongsnote.dev)** 에 적용했습니다.

### Code Block Formatting - `Rehype Pretty Code`

- Code Block 커스터마이징을 위해 `Rehype Pretty Code` 라이브러리를 적용했습니다.

### remark-GFM inTable issue

- remark-gfm 버전이 3에서 4버전으로 업데이트 되면서 빌드할 떄, `inTable` issue로 빌드가 안되는 문제가 생겼습니다. Contentlayer와의 호환성 issue로 판단되어, 3버전으로 다운그레이드했습니다.

## 트러블 슈팅 in Astro

### Dark Mode 구현

- 기존 Next.js 프레임워크를 사용했을 때는, next-themes를 활용해서 빠르게 다크 모드를 구현했으나, 프레임워크를 변경함에 따라, 해당 패키지 사용이 불가해져서, 다크 모드에 대한 컴포넌트를 직접 구현했습니다.

## 📜 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)
- [Astro 공식 문서](https://astro.build)
