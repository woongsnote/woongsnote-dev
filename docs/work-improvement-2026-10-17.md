# Woongsnote 개선 검증 기록 — 2026-10-17

## 사전 점검

- 작업 저장소: `woongsnote/woongsnote-dev`, 기존 `dev` 브랜치 사용.
- 시작 dev: `53ec718bfcf183057ee4b33d2d3f38c5ba8e500d`.
- 시작 main: `92f6663468ec33b2f9319d453849191492681fae`.
- main이 3커밋 앞서며 파일 트리는 동일. dev에서 `git merge --ff-only origin/main` 실행.
- Astro 7.3.8, Tailwind CSS 4.3.3, daisyUI 5.7.50, Pagefind 1.5.2.
- 기존 build는 `astro check && astro build && pagefind --site dist`.
- 기존 GitHub Actions 없음. main에 Vercel 필수 상태 검사가 설정되어 있음.
- `vercel.json`은 보안 응답 헤더 설정. 플랫폼 내부 배포 설정은 저장소 파일만으로 확인할 수 없음.

## Phase 1 — UX

- rehype-pretty-code 마크업과 하이라이팅을 유지하며 런타임 복사 버튼 추가.
- code.textContent만 복사. 성공·실패 live 안내, 44px 터치 영역, 키보드 조작, Clipboard API 부재 시 구형 copy 대체 경로.
- 긴 코드의 스크롤바 표시, 키보드로 접근 가능한 스크롤 영역, 버튼과 코드의 겹침 방지.
- 검색 중·결과 수·결과 없음·오류 구분, 재시도 버튼, 모달 이름과 상태 안내 연결.
- 150ms 디바운스와 Pagefind 유지. 새 입력 즉시 이전 요청을 무효화하여 대기 중 응답 순서 역전 방지.
- 방향키로 실제 링크에 포커스, Enter 네이티브 이동, ESC, Cmd/Ctrl+K, 닫기 후 원래 포커스 복원 유지·보완.
- 기존 포맷 검사 위반: 소스 18개 파일의 서식만 정리. 게시글 원문은 `.prettierignore`로 보존.

### 실행한 검증

- `npm ci`, `npm run format:check`, `npm run build`, `git diff --check`: 통과.
- Astro: 0 errors, 0 warnings. 구형 `execCommand` 복사 대체 API에 deprecation hint 1개.
- 프로덕션 출력: HTML 66개, Pagefind 게시글 43개 색인.
- 실제 headless Chromium 153: 1440×900 / 390×844 × 라이트·다크 4조합 통과.
- Clipboard 실제 쓰기·읽기로 코드 내용 일치 확인. 데스크톱 Enter, 모바일 터치 복사 확인.
- 긴 코드 주입 시 문서 가로 넘침 없음, 코드 자체 가로 스크롤 확인. 제목·하이라이트 마크업 보존 확인.
- 실제 Pagefind 정상 검색, 결과 없음, 결과 링크 Enter 이동, 방향키, ESC, Ctrl+K, 포커스 복원 통과.
- API 모의 실패: 클립보드 권한 거부, Clipboard API 부재 대체 경로, 검색 오류·재시도, 응답 순서 역전 통과.
- 확인 한계: 실제 iOS Safari/Android 기기, 실제 화면낭독기 음성 출력은 확인하지 않음. Cmd 키는 구현 보존 및 코드 확인, Ctrl 단축키는 브라우저 실행 확인.
- 외부 giscus 리소스는 테스트 환경에서 연결 실패. 댓글 서비스 연동은 검증 범위 밖이며 변경하지 않음.

### 주요 변경 파일

- `src/components/post/detail/CodeCopy.astro`, `code-copy.ts`
- `src/components/search/SearchModal.astro`, `search-modal.ts`, `pagefind.ts`
- `src/layouts/PostLayout.astro`, `src/styles/typography.css`
- `.prettierignore` 및 기존 소스의 서식 정리

### Phase 1 원격 반영 확인

- 원격 dev 커밋: `1e2d449a45a3712d2d938d5a43312fff7e50ad86`.
- 일반 CLI push는 인증 정보가 없어 실패. 연결된 GitHub로 동일 파일 트리의 커밋을 생성하고 `force=false`와 예상 원격 SHA 확인으로 기존 dev를 fast-forward 갱신.
- 원격 조회와 fetch로 SHA 확인, 검증한 로컬 트리와 동일함을 확인한 후 로컬 dev 동기화.
- Phase 1 Vercel 상태: `success`, 설명 `Deployment has completed` 확인.
- 원격 확인을 완료한 뒤 Phase 2 시작.

## Phase 2 — 품질 및 유지보수

- 기존 build와 Vercel 설정은 유지. dev push와 후속 dev/main 대상 PR에서 검증하는 GitHub Actions 1개 추가.
- `npm run validate`: 포맷 → 격리된 콘텐츠 fixture → 기존 build(Astro check 포함) → 생성물 검사 → 단일 Chromium smoke 검사.
- 빌드 산출물을 HTML 파서로 검사. 홈·아카이브·소개·게시글·태그, 내부 링크/앵커/에셋, RSS·사이트맵·Pagefind, 기존 43개 글의 slug/URL/발행일을 검증.
- 선택적 `updatedDate` 스키마와 조건부 화면 표시. 기존 JSON-LD 생성기의 `dateModified` 인자를 연결하고 실제 수정일이 있을 때만 Open Graph 수정 시각 출력.
- RSS item의 발행일·GUID와 전체 정렬을 보존. 채널의 `lastBuildDate`에 실제 수정일 반영.
- 최신화 후보 4개를 실제 본문과 현재 구현 차이에 근거하여 `docs/content-maintenance.md`에 기록. 본문은 변경하지 않음.
- 회귀 검증에서 발견한 Tab 포커스 이탈과 CSS layer 우선순위로 코드 복사 버튼 여백이 덮이는 문제를 최소 범위 수정. 앞으로 같은 문제가 발생하면 브라우저 검사가 실패하도록 검증 추가.
- 테스트 전용 devDependency: HTML 파서 `parse5`, 브라우저 드라이버 `playwright-core`. 별도 E2E 러너와 다중 브라우저 환경은 도입하지 않음.

### 최종 로컬 검증 결과

- `npm ci`: 변경한 lockfile로 재설치 성공.
- `npm run validate`: 전체 통과. Chromium 바이너리는 이 환경에 설치한 실행 파일을 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`로 지정.
- `npm run format:check`, `git diff --check`: 통과.
- Astro: 0 errors, 0 warnings, 기존의 구형 복사 API deprecation hint 1개.
- HTML 66개, 게시글 URL·발행일 43개, 태그 19개, 내부 참조 1,393개 검사 통과.
- RSS item 수·발행일·GUID·발행일 정렬, 사이트맵 필수 URL·태그 noindex 정책, Pagefind 게시글 수·실제 검색 통과.
- 수정일 유무 화면·SEO와 RSS 채널 변경일/발행일 정렬: 격리된 저장소 복사본에 fixture 글을 넣어 실제 Astro 빌드로 통과. 테스트가 운영 소스나 최종 dist를 바꾸지 않음.
- 1440px/390px × 두 테마에서 실제 클립보드 비교, 모바일 터치/키보드 복사, 제목·하이라이팅, 긴 코드 스크롤, 버튼 크기·코드 겹침 없음, 테마별 색상 변화, 실제 Pagefind 검색, 결과 없음, 포커스 순환·복원, 방향키·Enter, Ctrl+K·Meta+K 통과.
- Clipboard 권한 거부·API 부재(native copy 대체 경로 실제 복사)·대체 경로 실패, 검색 오류와 재시도 성공, 늦은 응답 무시·대기 중 닫기/다시 열기 통과.
- 원본 main 대비 기존 Markdown 콘텐츠 diff 없음. 기존 발행일·slug 수정 없음.

### 주요 변경 파일

- `.github/workflows/validate.yml`, `package.json`, `package-lock.json`
- `scripts/{html,validate-build,test-content,test-browser}.mjs`
- `tests/fixtures/published-posts.json`
- `src/content.config.ts`, `src/types/index.ts`
- `src/layouts/{PostLayout,BaseLayout,BaseHead}.astro`, `src/lib/rss.ts`
- `src/components/search/search-modal.ts`, `src/styles/typography.css`
- `README.md`, `docs/content-maintenance.md`, 본 검증 기록

### 확인 범위와 후속 후보

1. `docs/content-maintenance.md`의 기술 글 후보를 우선순위대로 검토. 당시 버전 설명은 보존하고 새 안내 또는 버전 표기 여부부터 결정.
2. 실제 iOS Safari/Android 및 화면낭독기 음성 출력은 별도 확인 필요. 현재 반응형·키보드·접근성 속성 검증은 headless Chromium 기반.
3. 외부 giscus 인증/댓글 등록은 수행하지 않음. 환경의 외부 연결 제한으로 댓글 서비스 자체는 검증하지 않았으며 관련 소스는 서식 외 변경 없음.

main 직접 변경, 새 브랜치 생성, PR 생성·병합 및 강제 푸시는 수행하지 않았다. GitHub Actions 실행 결과와 최종 원격 SHA는 원격 반영 후 최종 보고에서 별도로 확인한다.
