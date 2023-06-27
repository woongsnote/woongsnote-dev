# 기술 블로그 프로젝트

## 개요

`Next.js`와 `TypeScript`를 사용해서 직접 구현한 기술 블로그

## 개발 내용

### 1. 개발 기간

- 2022.11 - ing

### 2. 기술 스택

- Framework: `Next.js`
- Styling: `Tailwind CSS`
- Content: `MDX`, `ContentLayer`
- Deploy: `Vercel`

### 3. 구현 기능

- `Tailwind CSS`를 사용해서 반응형 네비게이션을 구현했습니다.

  - 태블릿 이상: 화면 상단에 네비게이션이 표시됩니다.

  - 모바일: 앱 스타일로 하단 네비게이션을 적용했습니다.

- `ContentLayer`를 이용하여 mdx로 작성한 게시글을 웹사이트에서 볼 수 있도록 구현했습니다.

- `next-themes`를 사용해서 **다크모드**를 적용했습니다.

- `Vercel`을 사용해서 배포했습니다.

### 4. 트러블 슈팅

- `MDX` 파일 변환
  `MDX`로 작성한 게시글을 보여줄 방법을 고민하던 중, `ContentLayer`를 알게 되었습니다. `Content made easy for developers` 라는 공식 홈페이지의 문구대로 적용 방법이 간단하고, `build time`도 빠르고, `Next.js`도 지원해서, 블로그에 적용했습니다.

- Next.js의 버전 업(12 → 13)에 따른 디렉토리 구조의 변화
  초기 블로그는 `pages` 디렉토리 구조로 구현했습니다. 이후 Next 13 버전과 함께 `App Router`가 등장했습니다. 초기에는 `Experimental` 상태여서 도입을 고려만 했었고, 버전이 올라 `Stable`된 이후 이를 블로그에 적용했습니다.

### 5. 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)

## 구현 결과

[서비스 링크](https://www.woongsnote.dev)

![미리보기](https://github.com/woongsnote/woongsnote-dev/assets/83802168/53a0e980-4a3c-461c-8366-48315220992e)
