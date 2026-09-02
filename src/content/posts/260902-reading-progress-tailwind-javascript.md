---
title: 'Reading Progress가 움직이지 않았던 이유'
description: 'Tailwind CSS의 scale과 JavaScript의 transform이 겹치면서 움직이지 않던 Reading Progress를 수정한 기록'
publishedDate: 2026-09-02
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'Tailwind CSS', 'JavaScript']
slug: reading-progress-tailwind-javascript
---

글을 얼마나 읽었는지 보여주는 `Reading Progress`를 추가했다.

글을 읽으면서 스크롤을 내리면 상단의 얇은 바가 함께 채워지는 단순한 기능이다.

컴포넌트까지 만들어두고 한동안 별문제 없이 동작한다고 생각했는데, 최근 글 상세 페이지를 정리하면서 다시 확인해보니 바가 전혀 움직이지 않고 있었다.

## 먼저 진행률 계산을 확인했다

수정 전 컴포넌트에서는 글의 시작과 끝을 미리 계산해두고, 스크롤 위치에 따라 0부터 1 사이의 값을 만든다.

```ts
const update = () => {
  frame = 0;

  const distance = end - start;
  // 한 화면에 모두 들어오는 짧은 글은 이미 끝까지 보이는 상태다.
  const value =
    distance <= 0
      ? Number(window.scrollY >= end)
      : Math.min(1, Math.max(0, (window.scrollY - start) / distance));

  progress.style.transform = `scaleX(${value})`;
};
```

코드를 확인해보니 스크롤 이벤트 처리와 진행률 계산 자체에는 문제가 없어 보였다.

그런데 화면에서는 바가 계속 보이지 않았다.

## 문제는 `scale-x-0`이었다

Reading Progress의 초기 상태는 Tailwind의 `scale-x-0`으로 만들고 있었다.

```astro
<div
  data-reading-progress
  class="bg-primary pointer-events-none fixed inset-x-0 top-16 z-40 h-px origin-left scale-x-0"
  aria-hidden="true"
>
</div>
```

처음에는 X축 크기를 0으로 두고, JavaScript에서 `transform: scaleX()` 값을 바꾸면 그대로 진행률이 표시될 거라고 생각했다.

문제는 Tailwind CSS v4의 `scale-x-*`가 `transform` 안의 `scaleX()`가 아니라 별도의 CSS `scale` 속성을 사용한다는 점이었다.

`scale-x-0`은 X축의 `scale` 값을 0으로 만든다.

```css
scale: 0% var(--tw-scale-y);
```

반면 JavaScript에서는 별도의 `transform` 속성을 수정하고 있었다.

```ts
progress.style.transform = `scaleX(${value})`;
```

결과적으로 같은 요소에는 서로 다른 두 속성이 함께 적용되고 있었다.

```css
scale: 0% var(--tw-scale-y);
transform: scaleX(0.5);
```

JavaScript의 `transform` 값은 계속 변하고 있었지만, Tailwind가 적용한 X축 `scale` 값은 여전히 0이었다.

그래서 계산도 맞고 inline style도 바뀌는데 화면에서는 아무것도 움직이지 않았다.

## 수정은 한 줄이었다

원인을 찾은 뒤에는 JavaScript에서도 같은 `scale` 속성을 사용하도록 변경했다.

```ts
// Before
progress.style.transform = `scaleX(${value})`;

// After
progress.style.scale = `${value} 1`;
```

현재 `ReadingProgress.astro`에서는 다음과 같이 사용하고 있다.

```ts
const update = () => {
  frame = 0;

  const distance = end - start;
  // 한 화면에 모두 들어오는 짧은 글은 이미 끝까지 보이는 상태다.
  const value =
    distance <= 0
      ? Number(window.scrollY >= end)
      : Math.min(1, Math.max(0, (window.scrollY - start) / distance));

  progress.style.scale = `${value} 1`;
};
```

이제 초기 상태와 스크롤 이후 상태 모두 같은 CSS `scale` 속성을 사용한다.

변경 후에는 Reading Progress가 정상적으로 움직였다.

## 글의 어디까지 읽었는지도 정해두었다

수정하면서 Reading Progress가 기준으로 삼는 영역도 다시 확인했다.

`PostLayout.astro`에서는 `data-reading-progress-content`로 진행률을 계산할 범위를 감싸고 있다.

```astro
<div data-reading-progress-content>
  <header class="not-prose mb-10 sm:mb-12">
    <!-- 글 정보 -->
  </header>

  <Toc headings={headings} />

  {
    isProject && cover && (
      <Thumbnail
        image={cover}
        alt={coverAlt ?? title}
        title={title}
        link={link}
      />
    )
  }

  <div data-post-body>
    <slot />
  </div>
</div>

<FooterNavigation
  previousPost={previousPost}
  nextPost={nextPost}
  relatedPosts={relatedPosts}
/>

<Comments />
```

제목과 글 정보부터 TOC, 프로젝트 글의 썸네일, 실제 본문까지는 읽기 영역에 포함한다.

반대로 글을 다 읽은 뒤 사용하는 이전·다음 글과 관련 글, 댓글은 진행률 계산에서 제외한다.

`ReadingProgress.astro`에서는 이 영역의 위치와 높이를 측정해 시작점과 끝점을 정한다.

```ts
const measure = () => {
  const rect = content.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const headerOffset = progress.getBoundingClientRect().top;

  start = Math.max(0, top - headerOffset);
  end = Math.max(0, top + rect.height - window.innerHeight);
  requestUpdate();
};
```

스크롤할 때마다 영역을 다시 측정하는 대신 시작점과 끝점을 계산해두고 진행률만 갱신한다.

콘텐츠 높이나 화면 크기가 달라지는 경우에는 다시 측정한다.

```ts
window.addEventListener('resize', measure, {
  passive: true,
  signal: controller.signal,
});

const resizeObserver = new ResizeObserver(measure);
resizeObserver.observe(content);
```

스크롤에 따른 화면 업데이트는 `requestAnimationFrame()`으로 처리한다.

```ts
const requestUpdate = () => {
  if (!frame) frame = window.requestAnimationFrame(update);
};
```

결국 Reading Progress의 계산 방식이나 이벤트 처리에는 문제가 없었다.

문제는 마지막으로 화면에 값을 반영하는 한 줄이었다.

## 마무리

이번 문제는 JavaScript만 보고 있었다면 찾기 어려웠다.

진행률은 제대로 계산되고 있었고, `transform` 값도 계속 바뀌고 있었기 때문이다.

하지만 실제 요소에는 Tailwind의 `scale`도 함께 적용되고 있었다.

```ts
progress.style.transform = `scaleX(${value})`;
```

에서

```ts
progress.style.scale = `${value} 1`;
```

로 바꾼 게 수정의 전부였다.

Tailwind 같은 유틸리티 클래스를 쓰다 보면 클래스 이름만 보고 실제 CSS도 익숙한 방식으로 동작할 거라고 생각하기 쉽다.

이번에도 `scale-x-0`이라는 이름만 보고 `transform: scaleX(0)`과 비슷하게 동작할 거라고 생각했다.

화면에서 이상하게 동작하는데 JavaScript 값에는 문제가 없다면, 브라우저에 실제로 어떤 CSS가 적용되고 있는지도 같이 확인해보는 게 좋겠다.
