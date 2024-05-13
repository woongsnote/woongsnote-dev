# 기술 블로그

## 개요

| **개발** 관련 학습한 지식들과 직접 구현한 프로젝트들을 정리 및 공유하기 위한 **기술 블로그**입니다.

처음 블로그 개발을 시작했을 때는, `Next.js`와 `Contentlayer`의 조합으로 구현했습니다.

현재는 [`Astro`](https://astro.build) 기반으로 개발 및 운영 중입니다.

---

## 기술 스택

- 시작: `Next.js`, `TypeScript`, `Tailwind CSS`, `Contentlayer`

- 현재: `Astro`, `TypeScript`, `Tailwind CSS`

---

## 주요 기능

- `Tailwind CSS` 기반 반응형 UI
- `SEO` 적용
- `Dark` 모드 지원
- `Giscus` 기반 댓글 작성 가능

---

## 구현 결과

- [사이트 링크](https://www.woongsnote.dev)

- 미리보기

  ![preview](/src/assets/woongsnote.jpg)

---

## 트러블 슈팅

### OG Image 생성 in Next.js

- 문제: 게시글의 섬네일 이미지 400 Error 발생
- 원인: **next.config.js**에 이미지의 주소 누락
- 해결: 이미지 주소 추가

### remark-GFM inTable issue

- 문제: remark-gfm **inTable** issue로 빌드 실패
- 원인: Contentlayer와의 호환성
- 해결: 3버전으로 다운그레이드.

### package dependency 충돌

- 문제: Next.js와 Contentlayer 간의 package dependency 충돌
- 원인: Contentlayer issue
- 해결: Astro로 프레임워크 migration.

### 다크 모드 구현

- 문제: migration 하는 과정에서, next-themes 사용 불가
- 원인: Next.js 프레임워크용 패키지
- 해결: 라이브러리를 사용하지 않고 js로 직접 구현

### 프로젝트 배포 실패

- 문제: 프레임워크 변경 후, Vercel에서 배포 실패
- 원인: 기존 Next.js로 배포했을 때 캐싱된 데이터 존재
- 해결: 캐시를 제거하고 다시 배포

---

## 참고 자료

- [NextJS 공식 문서](https://nextjs.org/docs)
- [ContentLayer 공식 문서](https://www.contentlayer.dev)
- [Astro 공식 문서](https://astro.build)
