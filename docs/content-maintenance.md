# 콘텐츠 유지보수

## 수정일 사용

실제로 내용을 수정한 글에만 선택적으로 `updatedDate`를 추가한다.

```yaml
publishedDate: 2024-03-14
updatedDate: 2026-10-17
```

- 발행일은 변경하지 않는다. 포맷·빌드·의존성 갱신만으로 수정일을 추가하지 않는다.
- 수정일이 없으면 기존 표시와 호환되며 별도 수정일 표시와 `article:modified_time` 메타는 출력하지 않는다.
- 수정일이 있으면 상세 화면과 JSON-LD `dateModified`, Open Graph 수정 시각에 반영된다.
- 기존 JSON-LD는 수정일이 없을 때 발행일을 `dateModified`에 사용하는 정책을 유지한다.
- 홈·아카이브·태그·이전/다음 글·RSS 정렬은 계속 `publishedDate` 기준이다.
- RSS item의 `pubDate`와 GUID는 유지한다. 채널 `lastBuildDate`만 전체 발행일·수정일 중 최댓값을 사용한다.
- 사이트맵 URL·태그 noindex 정책은 유지한다. 이번 변경으로 임의의 `lastmod`를 생성하지 않는다.

## 최신화 검토 후보

아래는 **실제 본문과 현재 저장소의 구현 차이**로 선정한 검토 목록이다. 외부 라이브러리의 최신 정책이나 지원 종료 여부를 단정한 목록이 아니다. 본문은 이번 작업에서 변경하지 않았다.

| 우선순위 | 게시글                                                       | 확인한 근거                                                                                                                                                                    | 후속 작업 후보                                                                                                |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| 1        | `240314-tailwind-css-v4-guide.md` — Tailwind CSS v4 적용하기 | 개요에 현재 버전이 3이고 4가 출시 예정이라고 설명하며 `@next` 설치 명령을 사용. 현재 저장소는 Tailwind 4.3.3과 `@tailwindcss/vite`를 사용.                                     | 알파 시점 글임을 명시할지, 정식 v4 적용 글을 따로 쓸지 결정한 후 설치 절차 재실행.                            |
| 2        | `240624-daisyui-guide.md` — daisyUI 사용하기                 | `tailwind.config.js`의 `require('daisyui')` 설정을 설명. 현재 저장소는 daisyUI 5.7.50과 CSS `@plugin 'daisyui'`를 사용.                                                        | 작성 당시 버전을 명시하고 v5 설정은 별도 문서로 분리하는 방안 검토.                                           |
| 3        | `240322-astro-mdx-blog-setup.md` — MDX 블로그 구현하기       | `astro add tailwind`, `@astrojs/tailwind` 및 예전 콘텐츠 설정 예시를 포함. 현재 저장소는 Vite 플러그인과 `src/content.config.ts`의 glob loader 사용, 콘텐츠는 Markdown만 사용. | 현재 블로그 구현 안내로 계속 사용할지, 당시 구현 기록으로 보존할지 판단 후 새 글 또는 적용 버전 안내 검토.    |
| 4        | `230424-code-formatting-tools.md` — ESLint와 Prettier        | CRA 내장 ESLint 설명과 `.eslintrc`/`react-app` 설정 예시를 제공. 작성일 2023-04-24.                                                                                            | 현재 독자가 그대로 따라 하는 설치 가이드인지 확인하고, 해당 버전을 명시하거나 별도 환경에서 설치·설정 재검증. |

Next.js 14, Astro 6/7 등 특정 버전을 명시한 기록은 버전이 오래되었다는 이유만으로 재작성하지 않는다. 기술 글의 설명이 틀렸는지와 작성 당시 환경의 설명인지를 구분한다.

## 검증 운영

```bash
npm ci
npx playwright-core install chromium
npm run validate
```

Linux에서 브라우저 시스템 라이브러리가 없다면 설치 명령에 `--with-deps`를 추가한다. 이미 설치한 Chromium을 사용할 때는 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`로 실행 파일 경로를 지정할 수 있다.

- `format:check`: 소스 포맷. 기존 게시글은 원문 보존을 위해 제외.
- `test:content`: 격리된 임시 복사본에 테스트 글을 추가하고 실제 Astro 빌드로 수정일 유무·SEO·RSS·정렬을 검사. 원본 소스와 최종 dist에는 테스트 글을 추가하지 않음.
- `build`: 기존 명령 그대로 Astro 정적/타입 검사 → 프로덕션 빌드 → Pagefind 색인.
- `test:build`: 홈·아카이브·소개·게시글·태그, 내부 링크/앵커/에셋, 기존 URL/발행일, RSS·사이트맵·검색 색인 검사.
- `test:browser`: Chromium 하나로 1440px/390px 및 두 테마에서 복사·실제 Pagefind·키보드·포커스·넘침 검사. API 실패·재시도·비동기 응답 순서는 모의 응답으로 별도 검사.
- GitHub Actions: dev 푸시, dev/main 대상 후속 PR, 수동 실행에 동일 검증 사용. 기존 Vercel 배포는 변경하지 않음.

`tests/fixtures/published-posts.json`은 개선 전 43개 글의 파일명·slug·발행일 기준표다. 신규 글 추가는 허용하며, 기존 글 URL/발행일 변경·삭제는 실패한다. 의도적 URL 이전을 진행할 때만 리디렉션 계획을 검토한 뒤 기준표를 함께 갱신한다.
