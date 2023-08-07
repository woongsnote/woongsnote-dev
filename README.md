# 기술 블로그

이 프로젝트는 **프론트엔드 개발**에 관해 배운 지식을 공유하기 위해 만든 블로그입니다.

`Next.js`를 Framework로, `TypeScript`를 언어로, `Tailwind CSS`를 CSS Framework로, `ContentLayer`를 컨텐츠 관리 도구로 사용했습니다.

`content`폴더의 내용을 교체하면 같은 UI를 갖는 새로운 블로그를 만들 수 있습니다. `posts`와 `projects`로 구현한 폴더 구조가 바뀌는 경우, `contentlayer.config.ts` 파일의 수정이 필요합니다. 수정하는 방법은 [공식 문서](https://www.contentlayer.dev/docs/getting-started-cddd76b7#2-define-content-schema)에 잘 설명되어 있습니다.

## ⚒️ 기술 스택

- Framework: `Next.js`
- Styling: `Tailwind CSS`
- Content: `MDX`, `ContentLayer`
- Deploy: `Vercel`

## 🗃️ 특징

- `Light` / `Dark` 모드 토글
- 반응형 네비게이션
  - `width < 768px`: 하단 네비게이션 적용
  - `width >= 768px`: 상단 네비게이션 적용
- `SEO` 적용
- `PWA` 지원

## 🖥️ 미리보기

![Web](https://github.com/woongsnote/woongsnote-dev/assets/83802168/d71b047c-d139-4f0b-b632-536b797c25cf)

![Mobile](https://github.com/woongsnote/woongsnote-dev/assets/83802168/dfafb7fe-e75a-42c5-a31b-8a1f018609ae)

## 💡 성장 경험

### `ContentLayer`적용

- `MDX`로 작성한 게시글을 보여줄 방법을 고민하던 중, `ContentLayer`라는 컨텐츠 관리 도구를 알게 되었습니다. `Next.js` 프로젝트에 적용하는 방법이 공식 홈페이지에 잘 설명되어 있어, 이를 토대로 **블로그**에 적용했습니다.

### `App Router`적용

- 처음 블로그를 만들기 시작했을 때는 Next.js의 버전이 12버전이어서 Pages Router 방식만 존재했습니다. Next.js의 Major 버전이 **12**버전에서 **13**버전으로 업데이트되면서, App Router 방식이 등장했습니다. 초기에는 공식 홈페이지에서 이 방식을 production에 사용하는 것을 권장하지 않았기 때문에, App Router 방식으로 변경하는 방법에 관해 학습만 진행했습니다. **13.4** 버전에서부터 App Router 방식이 안정적으로 변경되었고, 이를 **블로그**에 적용했습니다.

## 📜 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)
