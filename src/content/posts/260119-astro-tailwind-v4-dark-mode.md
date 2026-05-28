---
title: 'Astro + Tailwind v4 다크모드 구현'
description: 'Astro에서 Tailwind CSS와 light-dark()를 사용해 라이트/다크를 안정적으로 토글하는 방법'
publishedDate: 2026-01-19
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'Tailwind CSS', 'DarkMode', 'light-dark']
slug: 'astro-tailwind-v4-dark-mode'
---

이 글은 **Astro 블로그**에서 **Tailwind CSS v4 토큰(@theme) + `light-dark()`** 를 사용해

- ✅ **시스템 설정(prefers-color-scheme)을 기본값으로 존중**하고
- ✅ **버튼으로 라이트 ↔ 다크만 강제 전환**하며
- ✅ **View Transition / 초기 로딩 / 애니메이션까지 안정적으로 처리하는**

실무용 다크모드 구현을 정리한 **최종 아티클**이다.

---

## 1. 설계 철학 (중요)

다크모드에서 가장 많이 생기는 버그는 **"system 상태를 코드로 제어하려는 시도"** 다.

이 글에서 채택한 원칙은 단순하다.

- **System 모드**: 아무것도 하지 않는다 (브라우저 + OS가 결정)
- **Light / Dark**: 사용자가 명시적으로 강제한다

즉,

> **system은 상태가 아니라 "기본값"이다**

---

## 2. global.css — Tailwind v4 토큰 + light-dark()

```css title="global.css"
@import 'tailwindcss';

@theme {
  --font-body: 'Pretendard Variable';

  /* Background */
  --color-background: light-dark(#fafafa, #0f0f23);

  /* Text */
  --color-primary: light-dark(#1a1a1a, #e2e8f0);
  --color-accent: light-dark(#2563eb, #38bdf8);
  --color-secondary: light-dark(#e4f1ff, #03346e);
  --color-sub: light-dark(#6c6c6c, #94a3b8);
}

/* ===============================
   THEME CONTROL
   system = 아무것도 선언하지 않음
================================ */

:root[data-theme='light'] {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

/* ===============================
   BASE STYLE
================================ */

html {
  @apply scroll-smooth antialiased;
}

body {
  @apply bg-background font-body text-primary relative mx-auto flex min-h-screen flex-col leading-7;
}

main {
  @apply mx-auto mt-2 w-full max-w-3xl px-4 sm:px-6 lg:px-8;
}
```

### 왜 이렇게 해야 할까?

- `light-dark()`는 **class**나 **data-attribute**를 직접 보지 않는다.
- 오직 **`color-scheme` + prefers-color-scheme**만 판단한다.

그래서 system 상태에서는 `color-scheme`를 **절대 선언하지 않는 것**이 핵심이다

---

## 3. 초기 로딩 깜빡임(FOUC) 제거

Astro Layout의 `<head>`에 **inline script**를 추가한다.

```astro title="FOUC 제거"
<script is:inline>
  const theme = localStorage.getItem('theme');
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>
```

이 스크립트는 CSS보다 먼저 실행되어,
**첫 페인트부터 올바른 테마**를 보장한다.

---

## 4. SVG + 애니메이션 테마 버튼

### 목표

- 🌞 / 🌙 SVG 아이콘
- system 상태에서는 **OS 기준 아이콘 표시**
- 부드러운 회전 애니메이션

---

## 5. ThemeToggle.astro (완성본)

```astro title="ThemeToggle.astro"
<button
  id="theme-toggle"
  class="text-sub hover:text-accent relative flex h-9 w-9 items-center justify-center rounded-md transition"
  aria-label="Toggle theme"
>
  <svg
    id="sun-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="absolute h-5 w-5 scale-100 rotate-0 transition-all duration-300"
  >
    <path
      d="M12 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 12a4 4 0 100-8 4 4 0 000 8zm7-5a1 1 0 110 2h-1a1 1 0 110-2h1zM7 12a1 1 0 01-1 1H5a1 1 0 110-2h1a1 1 0 011 1zm9.657-5.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM8.464 15.536a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm7.071 0a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM8.464 8.464a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z"
    ></path>
  </svg>

  <svg
    id="moon-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-300"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
  </svg>
</button>

<script is:inline>
  const STORAGE_KEY = 'theme';

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }

    updateIcon(theme);
  }

  function updateIcon(theme) {
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');

    const isDark = theme ? theme === 'dark' : systemPrefersDark();

    if (isDark) {
      sun.classList.add('scale-0', 'rotate-90');
      sun.classList.remove('scale-100', 'rotate-0');

      moon.classList.add('scale-100', 'rotate-0');
      moon.classList.remove('scale-0', 'rotate-90');
    } else {
      moon.classList.add('scale-0', 'rotate-90');
      moon.classList.remove('scale-100', 'rotate-0');

      sun.classList.add('scale-100', 'rotate-0');
      sun.classList.remove('scale-0', 'rotate-90');
    }
  }

  function toggleTheme() {
    const current =
      document.documentElement.getAttribute('data-theme') ??
      (systemPrefersDark() ? 'dark' : 'light');

    const next = current === 'dark' ? 'light' : 'dark';

    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved);

  document
    .getElementById('theme-toggle')
    ?.addEventListener('click', toggleTheme);

  document.addEventListener('astro:after-swap', () => {
    document
      .getElementById('theme-toggle')
      ?.addEventListener('click', toggleTheme);
    applyTheme(localStorage.getItem(STORAGE_KEY));
  });
</script>
```

---

## 6. 최종 구조 요약

```plaintext title="테마 구조"
System (OS)
 └─ prefers-color-scheme
     └─ light-dark()

User Button
 └─ data-theme (light | dark)
     └─ color-scheme override
```

- system은 **기본값**
- 버튼은 **override만 담당**
- Tailwind v4 철학과 완전히 일치

---

## 7. 한 줄 결론

> **가장 좋은 다크모드는
> system을 믿고,
> 사용자는 필요할 때만 개입하게 하는 것이다**

이 구조는 Astro 블로그에서 가장 단순하고 가장 예측 가능하며 가장 유지보수하기 쉽다.
