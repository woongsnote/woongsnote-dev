---
title: 'Astro 블로그 UI를 다시 다듬었다'
description: '기존의 미니멀한 구조를 유지하면서 헤더와 게시물 목록, 검색 모달, 상세 페이지를 다듬고 실기기에서 확인한 기록'
publishedDate: 2026-07-24
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'Tailwind CSS', 'UI', 'Responsive Design', 'Blog']
slug: 'astro-blog-ui-refinement'
---

최근 블로그 UI를 다시 보게 됐다. 큰 문제가 있었던 것은 아니다. 홈 게시물 목록의 날짜와 제목 간격, 활성 메뉴 표시, 검색 모달의 경계처럼 하나씩 보면 사소한 부분들이 계속 눈에 들어왔다.

처음에는 Apple Design Resources를 보면서 새로운 요소를 더해볼까 생각했다. 하지만 지금 블로그에 필요한 것은 완전히 다른 디자인보다 이미 만들어 둔 구조를 조금 더 자연스럽게 다듬는 일이었다.

Apple UI를 그대로 따라가기보다 여백과 상태 표현, 인터랙션을 정리하는 방식만 참고했다. 결국 이번 작업의 기준은 기존의 미니멀한 구조를 유지하면서 사용성을 높이는 것이 됐다.

## 홈 게시물 목록의 클릭 영역을 다듬었다

홈의 게시물 목록은 날짜와 제목 중심의 구조를 그대로 유지했다. 이번에 손본 부분은 목록의 형태가 아니라 각 항목이 반응하는 방식이었다.

기존에는 제목의 색상 변화로만 링크 상태를 표시했다. 여기에 항목 전체의 패딩과 옅은 배경 반응을 추가해, 클릭할 수 있는 범위를 조금 더 분명하게 만들었다.

```astro
<a
  href={`/${id}`}
  class="focus-ring group hover:bg-base-200/60 active:bg-base-200/80 -mx-2 flex items-baseline gap-4 rounded-lg px-2 py-2 text-sm no-underline transition-[background-color,opacity] duration-200 ease-out active:opacity-80 motion-reduce:transition-none md:block md:py-2.5"
></a>
```

평소에는 기존 목록과 큰 차이가 없지만, 마우스를 올리거나 터치하면 항목 전체에 옅은 배경이 나타난다. 그림자나 확대 효과는 추가하지 않았다. 목록의 밀도와 단순한 인상은 유지하면서 상호작용만 알아보기 쉽게 만들고 싶었다.

## 모바일 날짜 영역이 생각보다 넓었다

모바일 홈에서는 날짜와 제목을 한 줄에 배치한다. 처음에는 모든 제목의 시작 위치를 맞추기 위해 날짜 영역에 고정 너비를 지정했다.

```astro
<time
  datetime={publishedDate.toISOString()}
  class="text-neutral-content w-24 shrink-0 tabular-nums md:hidden"
>
  {formatDate(publishedDate)}
</time>
```

정렬은 안정적이었지만 `w-24`가 실제 날짜보다 넓은 공간을 차지했다. 그만큼 제목이 사용할 수 있는 영역이 줄어들면서 긴 제목이 예상보다 빠르게 줄바꿈됐다.

처음에는 `w-24`를 `w-20`으로 줄이거나 날짜의 글자 크기를 한 단계 낮추는 방법을 생각했다. 하지만 날짜 형식을 계속 `YYYY. MM. DD`로 유지할 예정이었기 때문에, 고정 너비 자체가 필요한지부터 다시 확인했다.

최종적으로는 날짜의 고정 너비를 제거했다.

```astro
<time
  datetime={publishedDate.toISOString()}
  class="text-neutral-content shrink-0 whitespace-nowrap tabular-nums md:hidden"
>
  {formatDate(publishedDate)}
</time>
```

`shrink-0`으로 날짜 영역이 공간 부족 때문에 줄어들지 않게 하고, `whitespace-nowrap`으로 날짜 내부의 공백에서 줄바꿈되지 않게 했다. 숫자에는 이미 `tabular-nums`가 적용돼 있어 날짜마다 숫자의 폭이 달라지는 문제도 줄일 수 있었다.

날짜 형식과 글자 수가 항상 같기 때문에 고정 너비를 제거한 뒤에도 각 항목의 제목 시작점은 일정하게 유지됐다. 대신 제목이 사용할 수 있는 공간은 조금 더 넓어졌다.

큰 변화는 아니었지만, 모바일 화면에서는 이 정도의 너비 차이도 제목 줄바꿈에 직접 영향을 줬다.

## 활성 메뉴를 조금 더 분명하게 만들었다

기존 헤더에서는 현재 페이지를 글자색으로만 구분했다. 기능적으로는 문제가 없었지만, 모바일 화면에서는 현재 위치가 생각보다 잘 드러나지 않았다.

활성 메뉴 아래에 얇은 선을 하나 추가했다.

```astro
{
  isActive && (
    <span
      aria-hidden="true"
      class="bg-base-content absolute inset-x-1 -bottom-1.5 h-px rounded-full"
    />
  )
}
```

메뉴 전체에 배경을 넣거나 선을 두껍게 만들지는 않았다. 현재 페이지를 알아볼 수 있을 정도로만 표시하면서 기존 헤더의 단순한 분위기를 유지하고 싶었다.

헤더에는 반투명 배경과 블러 효과도 적용했다.

```astro
<header
  class="bg-base-200/90 border-base-content/5 sticky top-0 z-50 h-16 border-b backdrop-blur-md"
>
</header>
```

스크롤할 때 콘텐츠가 헤더 뒤로 지나가는 느낌을 조금 더 자연스럽게 만들기 위한 변경이었다. 같은 효과를 게시물 목록이나 푸터까지 확대하면 화면이 복잡해질 수 있어 고정 헤더에만 제한했다.

## 검색 모달도 다시 보게 됐다

검색 기능의 동작은 이미 완성돼 있었지만, 입력창과 검색 결과, 하단 안내 영역이 하나의 화면으로 묶여 있다는 느낌은 조금 약했다. 모달의 외곽선과 배경, 모서리, 그림자를 조정해 하나의 시트처럼 보이도록 정리했다.

```astro
<div
  class="modal-box border-base-content/10 bg-base-100/95 max-w-2xl overflow-hidden rounded-2xl border p-0 shadow-2xl backdrop-blur-xl"
>
</div>
```

검색 결과 항목에도 같은 방향을 적용했다.

```ts
a.className =
  'search-result block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-base-200/70 focus-visible:bg-base-200/70 focus-visible:outline-none motion-reduce:transition-none';
```

마우스와 키보드 중 어떤 입력 방식을 사용하더라도 선택된 항목이 동일하게 보이도록 했다. `aria-label`, `autocomplete`, `spellcheck` 같은 입력 속성도 함께 보완했다. 겉으로 보이는 차이는 작지만, 모달의 역할과 조작 방식은 이전보다 조금 더 분명해졌다.

## 상세 페이지에서는 선 하나를 덜어냈다

상세 페이지에서는 제목과 날짜, 설명, 태그 아래에 가로 구분선이 있었다.

```astro
<div class="border-base-content/10 my-6 border-t"></div>
```

목차가 없는 글에서는 자연스러운 구분이었지만, 목차가 있는 글에서는 구분선 바로 아래에 테두리가 있는 목차 박스가 이어졌다. 모바일 화면으로 보니 두 개의 경계가 연속으로 나타나 조금 무겁게 느껴졌다. 구분선을 제거하고 헤더의 하단 여백으로 대체했다.

```astro
<header class="not-prose mb-8 flex flex-col gap-4"></header>
```

목차 박스 자체가 제목 영역과 본문을 충분히 구분하고 있었기 때문에 선을 없애도 구조가 흐려지지 않았다. 오히려 제목 영역에서 목차로 이어지는 흐름이 조금 더 가벼워졌다. 무언가를 추가하는 것보다 필요하지 않은 요소 하나를 덜어내는 편이 더 나은 경우도 있었다.

## 결국 아이폰에서 확인했다

코드만 보면 이번 변경은 대부분 클래스 몇 개를 바꾸는 작업이었다. 하지만 모바일에서는 몇 픽셀의 너비와 간격이 제목의 줄바꿈이나 메뉴 배치에 직접 영향을 준다.

변경 사항은 `dev` 브랜치에 먼저 적용하고 Vercel 프리뷰를 아이폰에서 확인했다. 날짜의 고정 너비를 제거한 뒤에도 제목 시작점이 일정한지, 긴 제목이 어디에서 줄바꿈되는지, 헤더 메뉴와 아이콘이 좁은 화면에서도 안정적으로 배치되는지를 실제 화면으로 비교했다.

특히 날짜 영역은 코드만 볼 때 고정 너비를 두는 것이 더 안전해 보였다. 하지만 실기기에서는 그 너비가 제목 영역을 불필요하게 제한하고 있다는 점이 더 분명하게 보였다.

브라우저 개발자 도구의 모바일 화면도 유용하지만, 실제 사용하는 기기에서 느껴지는 글자 크기와 간격까지 완전히 같지는 않았다. 작은 UI 변경일수록 마지막에는 실기기에서 한 번 더 확인하는 과정이 필요했다.

## 이제는 멈출 때가 됐다

UI를 계속 보고 있으면 간격이나 크기, 색상의 농도를 끝없이 조정할 수 있다. 하지만 어느 시점부터는 사용성을 개선하는 작업보다 개인적인 취향을 반복해서 비교하는 일에 가까워진다. 이번 작업을 마친 뒤에는 실제 사용 중 레이아웃이 깨지거나 가독성과 접근성 문제가 발견되는 경우, 또는 콘텐츠 구조가 달라져 기존 UI로 표현하기 어려운 경우에만 다시 수정하기로 했다.

이번 변경으로 블로그가 전혀 다른 모습이 된 것은 아니다. 헤더에는 현재 위치를 조금 더 분명하게 표시했고, 목록에서는 제목이 사용할 수 있는 공간을 넓혔다. 검색 모달의 경계를 정리하고, 상세 페이지에서는 필요하지 않은 선 하나를 덜어냈다.

하나씩 보면 작은 변경이지만, 이런 요소들이 모여 블로그를 읽을 때의 인상을 만든다. 이제는 실제로 불편하거나 구조가 달라질 때까지 현재 상태를 유지하려 한다.
