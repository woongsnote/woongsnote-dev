# 기술 블로그

이 프로젝트는 **개발**과 관련해서, 학습한 지식과 만든 프로젝트들을 공유하기 위해서 구현한 블로그입니다.

`content`폴더의 내용을 교체하면 같은 UI의 새로운 블로그를 만들 수 있습니다. `posts`와 `projects`로 구현한 폴더 구조가 바뀌는 경우, `contentlayer.config.ts` 파일의 수정이 필요합니다. 수정하는 방법은 [공식 문서](https://www.contentlayer.dev/docs/getting-started-cddd76b7#2-define-content-schema)에 잘 설명되어 있습니다.

## ⚒ 기술 스택

`Next.js`, `TypeScript`, `Tailwind CSS`,`ContentLayer`

## 🗃️ 특징

- `Light` / `Dark` 모드 토글
- 반응형 네비게이션
  - `width < 768px`: 하단 네비게이션 적용
  - `width >= 768px`: 상단 네비게이션 적용
- `SEO` 적용
- `PWA` 지원

## 🖥️ 구현 결과

- [사이트 링크](https://www.woongsnote.dev)

- Desktop

![Web](https://github.com/woongsnote/woongsnote-dev/assets/83802168/d58e62eb-f9c8-4cb3-a195-73e4b03e324b)

- Mobile

![Mobile](https://github.com/woongsnote/woongsnote-dev/assets/83802168/8d473ef5-9245-4736-9e70-6bcbdc693bc8)

## 💡 성장 경험

### `ContentLayer` 적용

- `MDX`로 작성한 게시글을 보여줄 방법을 고민하던 중, `ContentLayer`라는 컨텐츠 관리 도구를 알게 되었습니다. `Next.js` 프로젝트에 적용하는 방법이 공식 홈페이지에 잘 설명되어 있어, 이를 토대로 **블로그**에 적용했습니다.

### `App Router` 적용

- 처음 블로그를 만들기 시작했을 때는 Next.js의 버전이 12버전이어서 Pages Router 방식만 존재했습니다. Next.js의 Major 버전이 **12**버전에서 **13**버전으로 업데이트되면서, App Router 방식이 등장했습니다. 초기에는 공식 홈페이지에서 이 방식을 production에 사용하는 것을 권장하지 않았기 때문에, App Router 방식으로 변경하는 방법에 관해 학습만 진행했습니다. **13.4** 버전에서부터 App Router 방식이 안정적으로 변경되었고, 이를 **블로그**에 적용했습니다.

## 📜 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)
