# My Tech Blog

## 개요

> Next.js와 TypeScript로 직접 만든 기술 블로그

## 개발 내용

### 1. 개발 기간

- 2022.11 - ing

### 2. 기술 스택

- Framework: Next.js
- Styling: Tailwind CSS
- Content: MDX, ContentLayer
- Deploy: Vercel
- VCS: Git

### 3. 구현

- `Tailwind CSS` 를 이용한 반응형 네비게이션 구현

  - 태블릿 이상: 화면 상단에 네비게이션이 표시됩니다.

  - 모바일: 앱 스타일로 하단 네비게이션을 적용했습니다.

- `ContentLayer`를 이용하여 mdx로 작성한 게시글을 볼 수 있도록 구현했습니다.

- **다크모드** 적용

### 4. 트러블 슈팅

- MDX 파일 변환 ▶ `ContentLayer`을 적용하여 해결!

- Next.js의 버전 업(12 → 13)에 따른 디렉토리 구조 변화 ▶ 공식 문서를 참고해서 해결!

### 5. 참고 자료

- [NextJS](https://nextjs.org/docs)
- [ContentLayer](https://www.contentlayer.dev)
