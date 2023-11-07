# 기술 블로그

| **개발** 관련 학습한 지식과 구현한 프로젝트들을 공유하기 위한 블로그입니다.

처음 블로그 개발을 시작했을 때는, `Next.js`와 `Contentlayer`의 조합으로 구현했으나,
현재는 `Astro` 기반으로 운영 중입니다.

## ⚒️ 기술 스택

- 시작: `Next.js`, `TypeScript`, `Tailwind CSS`, `Contentlayer`
- 현재: `Astro`, `TypeScript`, `Tailwind CSS`

## 🗃️ 주요 기능

### 완성된 기능

- [x] `TailwindCSS` 기반 반응형 UI
- [x] `SEO` 적용
- [x] `Tag` 기반으로 게시글 검색 기능

### 구현 중인 기능

- [ ] `Light` / `Dark` 모드
- [ ] `PWA` 지원
- [ ] `Toc` 지원

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

- 

## 📜 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)
- [Astro 공식 문서](https://astro.build)
