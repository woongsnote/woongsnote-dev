---
title: 'Astro 블로그 디버깅: JSON-LD, theme-color, Giscus, View Transition'
description: '블로그 코드 점검 중 발견한 SEO 규격 위반, 테마 동기화 누락, View Transition 이벤트 손실, TypeScript variance까지 4건의 실제 버그와 해결 정리'
publishedDate: 2026-05-27
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'TypeScript', 'SEO', 'JSON-LD', 'View Transitions']
slug: 'astro-blog-debugging-roundup'
---

블로그 코드를 다시 훑어보다 4건의 실제 버그를 잡았다. 빌드는 모두 통과하지만 사용자나 크롤러 입장에서 비정상으로 보이는 종류다.

각 항목을 **현상 → 원인 → 해결** 순으로 정리하고, 마지막에 네 가지를 관통하는 패턴을 꺼낸다.

---

## 1. JSON-LD `name` 배열은 schema.org 위반이다

### 현상

`author` 정보에 한글 본명과 영문 표기를 함께 노출하려고 배열로 작성했다.

```ts title="src/config/seo.ts"
author: {
  '@type': 'Person',
  name: [AUTHOR.name, AUTHOR.nameEn], // ['문지웅', 'Jiwoong Moon']
  url: ...,
}
```

빌드는 통과하지만 Google Rich Results Test가 경고를 띄운다.

### 원인

schema.org에서 `name`은 **single-value** 속성이다. 배열은 명세 위반이고, 크롤러 구현에 따라 첫 요소만 사용하거나 전체를 무시한다.

### 해결

별칭은 `alternateName`이라는 별도 속성으로 분리한다.

```ts title="src/config/seo.ts"
author: {
  '@type': 'Person',
  name: AUTHOR.name,            // '문지웅'
  alternateName: AUTHOR.nameEn, // 'Jiwoong Moon'
  url: ...,
}
```

`alternateName`은 `Thing` 타입의 속성이고, `Person`은 `Thing`을 상속하므로 그대로 사용 가능하다. schema.org Person 페이지의 _"Properties from Thing"_ 섹션에 명시되어 있다.

**핵심**: 같은 정보를 여러 형태로 표현할 때는 자료구조(배열)가 아니라 의미 속성(`alternateName`)으로 분리해야 한다.

---

## 2. theme-color 메타는 적용된 테마를 따라야 한다

### 현상

라이트 OS 사용자가 블로그를 다크 테마로 토글하면 페이지는 다크인데 모바일 브라우저 상단바만 라이트 색으로 표시된다.

### 원인

기존 메타 태그는 OS 선호도를 따라가도록 작성되어 있었다.

```html
<meta
  name="theme-color"
  content="#121417"
  media="(prefers-color-scheme: dark)"
/>
<meta
  name="theme-color"
  content="#eceff2"
  media="(prefers-color-scheme: light)"
/>
```

문제는 실제 적용되는 테마가 `localStorage` 기반이라는 점이다. 두 출처(OS vs 사용자 선택)가 어긋나면 `theme-color`는 **OS 선호도만 본다**.

### 해결

단일 메타로 바꾸고 JS로 `<html data-theme>` 속성과 동기화한다.

```html
<meta name="theme-color" content="#121417" />
```

```js title="BaseLayout.astro 인라인 스크립트"
function syncThemeColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  const color = theme === THEME.light ? THEME.colors.light : THEME.colors.dark;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', color);
}

new MutationObserver(syncThemeColor).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});
```

`MutationObserver`가 `<html>`의 `data-theme` 변화를 감지해, 변경 출처가 무엇이든(테마 토글 / View Transition / 초기화) 메타 색상이 자동으로 따라간다.

**핵심**: `prefers-color-scheme`은 OS 선호도만 안다. 사용자가 앱 내에서 명시적으로 선택한 상태는 모른다.

---

## 3. Giscus iframe의 초기 테마 sync 누락

### 현상

페이지 로드 직후 댓글 영역(Giscus)이 가끔 잘못된 테마로 표시된다. 사용자가 테마를 한 번 토글해야 맞춰진다.

### 원인

기존 코드는 `MutationObserver`로 `data-theme` **변경 시점**에만 sync를 호출했다. 초기 로드 시점에는 호출되지 않는다.

Giscus iframe은 cross-origin이라 직접 접근 불가. `data-theme="preferred_color_scheme"` 속성으로 초기 테마를 받지만, 이 값은 OS 선호도 기반이라 사용자가 명시적으로 선택한 블로그 테마와 다를 수 있다.

### 해결

iframe이 로드 완료되면 giscus.app origin에서 부모 창에 message를 보낸다. 이걸 감지해 초기 sync를 실행한다.

```js title="PostComments.astro"
function syncGiscusTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  const giscusTheme = theme === 'woong-dark' ? 'dark_tritanopia' : 'light';
  const iframe = document.querySelector('iframe.giscus-frame');
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: giscusTheme } } },
    'https://giscus.app'
  );
}

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  if (event.data?.giscus) syncGiscusTheme();
});
```

`event.origin` 검증은 보안 필수다. 임의의 cross-origin 메시지를 받으면 XSS 벡터가 된다.

**핵심**: cross-origin iframe의 ready 시점은 외부에서 정확히 알 수 없다. iframe이 자기 자신의 준비 완료를 알리는 message를 기다리는 게 안정적이다.

---

## 4. View Transition 후 이벤트 리스너 분실

### 현상

포스트 간 View Transition으로 이동한 후 공유 버튼을 클릭해도 아무 반응이 없다. 새로고침하면 정상 동작한다.

### 원인

```js title="PostShareButton.astro (수정 전)"
const shareButton = document.getElementById('shareButton');
if (shareButton) {
  const title = shareButton.getAttribute('data-title') || '';
  const url = shareButton.getAttribute('data-url') || '';
  shareButton.addEventListener('click', () => sharePost(title, url));
}
```

문제는 두 가지였다.

1. **Astro 모듈 스크립트는 첫 페이지 로드 시 1회만 실행**된다. `View Transition`으로 페이지가 바뀌어도 스크립트는 재실행되지 않는다. 새 페이지의 새 버튼 DOM에는 리스너가 붙지 않는다.
2. `title` / `url`을 **스크립트 실행 시점에 closure로 캡처**한다. 1번이 해결되어도 stale 값이 박힌다.

### 해결

이벤트 위임 패턴으로 전환한다.

```ts title="PostShareButton.astro"
document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  const button = target?.closest('#shareButton');
  if (!button) return;

  const title = button.getAttribute('data-title') ?? '';
  const url = button.getAttribute('data-url') ?? '';
  sharePost(title, url);
});
```

**DOM은 View Transition으로 교체되지만 `document` 객체는 살아남는다.** `document`에 한 번 붙인 리스너는 영구 유지된다. 새로 그려진 버튼도 같은 위임 리스너가 처리한다.

추가로 `title` / `url`을 클릭 시점에 dataset에서 읽으므로 stale closure 문제도 자연스럽게 해결된다.

**핵심**: View Transition은 DOM을 교체하지만 `document` / `window`는 유지된다. 이 차이를 이해하면 라이프사이클 함정 대부분을 피할 수 있다.

---

## 5. 보너스: TypeScript variance가 Buffer를 막는다

위 네 건 외에 OG 이미지 생성 코드에서 작은 미스터리 하나 더.

```ts title="src/lib/og.ts"
const png = await sharp(Buffer.from(svg)).png().toBuffer();
return new Response(new Uint8Array(png), { ... });
```

처음엔 _"`Buffer`는 이미 `Uint8Array`의 자식인데 왜 다시 감싸지?"_ 라는 의문이 들었다. wrapping을 제거하면 TypeScript가 거부한다.

```
Argument of type 'Buffer<ArrayBufferLike>' is not assignable
  to parameter of type 'BodyInit'
```

원인은 **TypeScript의 variance 규칙**이다.

| 타입           | 제네릭 파라미터               |
| -------------- | ----------------------------- |
| Node `Buffer`  | `Uint8Array<ArrayBufferLike>` |
| DOM `BodyInit` | `Uint8Array<ArrayBuffer>`     |

- `ArrayBufferLike` = `ArrayBuffer | SharedArrayBuffer` ← 넓은 타입
- `ArrayBuffer` ← 좁은 타입

TypedArray는 buffer를 양방향(읽기 / 쓰기) 다루기 때문에 제네릭 파라미터가 **invariant**다. 넓은 쪽을 좁은 쪽에 대입할 수 없다.

`new Uint8Array(png)`로 감싸면 새 인스턴스가 `Uint8Array<ArrayBuffer>`로 추론되어 통과한다. 런타임 비용은 데이터 복사 1회. SSG라 빌드 타임에만 발생하므로 무시할 수준이다.

**핵심**: Node와 DOM은 같은 빌트인을 서로 다른 가정으로 타이핑한다. 이 경계에서 충돌이 자주 일어난다. 우회 코드 옆에는 반드시 사유 주석을 남겨야 한다. 그렇지 않으면 6개월 뒤 자신이 "이거 dead code 아닌가?" 의심하게 된다.

---

## 공통 패턴: data-theme single source of truth

위 네 건 중 2·3·4번에서 같은 해결 패턴이 등장했다.

> **`<html data-theme>` 속성을 single source of truth로 두고, 모든 의존 요소가 이것을 추적한다.**

- theme-color 메타: `MutationObserver`로 `data-theme` 변화 추적
- Giscus iframe: 같은 observer + 초기 sync용 message listener
- ShareButton: `document` 레벨 이벤트 위임으로 DOM 교체와 무관하게 동작

각 의존 요소가 *"누가 나에게 알려줘야 한다"*가 아니라 *"내가 source of truth를 보고 따라간다"*라는 책임 구조다. 이 일관성이 코드를 단순하게 만든다.

신규 기능이 테마에 의존한다면 동일한 구조로 추가하면 된다.

1. `data-theme` 속성을 읽어 자기 상태 결정
2. `MutationObserver`로 변경 추적
3. 외부 호출 받을 필요 없음

라이브러리 추가 없이 표준 DOM API만으로 자동 복구되는 시스템이 만들어진다.

---

## 한 줄 결론

> **사용자의 명시적 선택이 있다면, OS 선호도와 라이브러리 기본값은 더 이상 source of truth가 아니다.**

JSON-LD, theme-color, Giscus, ShareButton — 형태는 달랐지만 모두 같은 종류의 누락이었다. *"기본값이 있으니까 따로 안 챙겨도 되겠지"*가 만들어내는 균열.

이 정도의 정기 점검은 6개월에 한 번씩은 돌릴 만하다.
