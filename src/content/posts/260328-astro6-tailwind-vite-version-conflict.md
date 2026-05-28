---
title: 'Astro 6, Tailwind CSS v4, Vite 8 버전 충돌 해결하기'
description: 'Astro 6.1이 Vite 7을 사용하는데 Tailwind CSS v4.2.2가 Vite 8을 끌어오면서 발생하는 버전 충돌 문제와 해결 방법 정리'
publishedDate: 2026-03-28
category: 'Tech'
author: 'woongsnote'
tags: ['Astro', 'Tailwind CSS', 'Vite']
slug: 'astro6-tailwind-vite-version-conflict'
---

## 문제: Astro 6.1에서 Vite 8 경고가 뜬다

Astro 6과 Tailwind CSS v4를 함께 사용하는 프로젝트에서 `tailwindcss`와 `@tailwindcss/vite`를 최신 버전(v4.2.2)으로 업데이트한 뒤, 개발 서버를 실행하면 다음과 같은 경고가 나타날 수 있다.

```
▶ Vite 8.0.3 detected in your project.
  Astro requires Vite 7. Add "overrides": { "vite": "^7" } to your package.json to avoid issues.
```

Astro가 `package.json`에 자동으로 `"overrides": { "vite": "^7" }`을 추가하려고 시도하기도 한다. 심한 경우 rolldown과 rollup의 `Plugin` 타입 충돌로 빌드 자체가 실패한다.

## 원인: Vite 7 vs Vite 8

2026년 3월 기준, 각 도구의 Vite 버전 지원 현황은 다음과 같다.

| 도구                    | 번들된 Vite 버전 | 비고                                |
| ----------------------- | ---------------- | ----------------------------------- |
| **Astro 6.x**           | Vite 7           | Vite 8 미지원 (공식)                |
| **Tailwind CSS v4.2.1** | —                | peer dep: `vite ^5 \|\| ^6 \|\| ^7` |
| **Tailwind CSS v4.2.2** | —                | peer dep에 `^8` 추가                |
| **Vite 8**              | —                | 2026-03-12 정식 출시, Rolldown 기반 |

핵심은 **Tailwind CSS v4.2.2부터 `@tailwindcss/vite`의 peer dependency에 `vite ^8`이 추가**되었다는 점이다. 패키지 매니저가 의존성을 해석할 때 Vite 8을 설치하게 되면, Astro 6이 요구하는 Vite 7과 충돌이 발생한다.

### Vite 8에서 무엇이 바뀌었나

Vite 8의 가장 큰 변화는 **번들러가 Rollup에서 Rolldown(Rust 기반)으로 교체**된 것이다. 플러그인 API 호환성은 유지되지만, 내부적으로 완전히 다른 번들러를 사용하기 때문에 프레임워크 차원의 검증이 필요하다.

### Astro의 Vite 8 대응 현황

Astro 팀은 `chris/vite-8` 브랜치([PR #15819](https://github.com/withastro/astro/pull/15819))에서 Vite 8 업그레이드를 시도 중이지만, 아직 CI가 통과하지 못한 상태다.

Astro 6.1에서는 오히려 방어 로직이 추가되었다. [PR #16062](https://github.com/withastro/astro/pull/16062)에서 확인할 수 있듯, 개발 서버 시작 시 Vite 8이 감지되면 경고를 표시하고, Cloudflare 어댑터 추가 시에는 자동으로 `"overrides": { "vite": "^7" }`을 `package.json`에 삽입한다. 이 PR의 설명에 `@tailwindcss/vite`가 Vite 8을 hoist해서 `require_dist is not a function` 크래시가 발생하는 시나리오가 명시되어 있다.

참고로 이 `Plugin` 타입 충돌 패턴은 Vite 메이저 버전이 올라갈 때마다 반복되고 있다. Vite 7 때도 [withastro/astro#14030](https://github.com/withastro/astro/issues/14030)에서 동일한 증상이 보고된 바 있다.

즉, **Astro가 공식적으로 Vite 8을 지원하지 않는 상황에서 Tailwind만 Vite 8을 끌어오면 문제가 생긴다.**

### Tailwind 쪽 이슈

Tailwind CSS GitHub에서도 관련 논의가 활발하다.

- [Discussion #19624](https://github.com/tailwindlabs/tailwindcss/discussions/19624): Vite 8과 `@tailwindcss/vite`를 함께 사용하는 방법에 대한 커뮤니티 논의. v4.2.2 출시 전에는 insiders 빌드나 overrides로 우회하는 방법이 공유되었다.
- [Issue #19798](https://github.com/tailwindlabs/tailwindcss/issues/19798): v4.2.1까지는 peer dep에 `^8`이 없어서 Vite 8 프로젝트에서 아예 설치가 실패하는 문제 보고.
- [Issue #19792](https://github.com/tailwindlabs/tailwindcss/issues/19792): Vite 8에서 LightningCSS 설정 공유 방식이 변경되어, Tailwind과 추가 호환 작업이 필요할 수 있다는 이슈. 아직 open 상태다.

## 해결: Tailwind CSS v4.2.2 + overrides로 Vite 7 고정

가장 안정적인 방법은 **Tailwind CSS는 최신(v4.2.2)을 유지하되, `overrides`로 Vite 7을 강제**하는 것이다.

```json title="package.json"
{
  "dependencies": {
    "tailwindcss": "^4.2.2",
    "@tailwindcss/vite": "^4.2.2"
  },
  "overrides": {
    "vite": "^7"
  }
}
```

`overrides`를 추가한 뒤, 기존 의존성을 정리하고 재설치한다.

```bash
rm -rf node_modules package-lock.json
npm install
```

Astro 경고 메시지 자체가 이 방법을 안내하고 있으며, [PR #16062](https://github.com/withastro/astro/pull/16062)에서도 Cloudflare 어댑터 사용 시 이 overrides를 자동 삽입하는 로직이 구현되어 있다. Astro가 공식적으로 권장하는 해결책이다.

### v4.2.1 고정은 왜 안 되는가

처음에는 Vite 8 peer dep이 추가되기 이전 버전인 v4.2.1로 고정하는 방법을 시도했다.

```json title="package.json (문제 발생)"
{
  "dependencies": {
    "tailwindcss": "4.2.1",
    "@tailwindcss/vite": "4.2.1"
  }
}
```

Vite 경고는 사라지지만, daisyUI v5와 함께 사용하면 `global.css`에서 다음 에러가 발생한다.

```
V.map is not a function
```

이는 `tailwindcss`와 `@tailwindcss/vite`의 내부 코어 모듈 버전이 daisyUI v5가 사용하는 `@plugin` API와 맞지 않아서 발생하는 문제다. Tailwind v4의 minified 코드에서 터지기 때문에 에러 메시지만 보면 원인을 파악하기 어렵다.

**daisyUI v5를 사용하는 프로젝트라면 v4.2.1 고정은 피해야 한다.**

### pnpm을 사용하는 경우

pnpm은 `overrides` 대신 `pnpm.overrides`를 사용한다.

```json title="package.json"
{
  "pnpm": {
    "overrides": {
      "vite": "^7"
    }
  }
}
```

## 업그레이드 전략

지금 당장은 Tailwind v4.2.2 + Vite 7 overrides 조합으로 안정적으로 운영하고, 다음 조건이 충족되면 overrides를 제거하면 된다.

1. **Astro가 Vite 8을 공식 지원**할 때 (Astro 7 또는 6.x 마이너)
2. 그 시점의 **Tailwind CSS 최신 버전으로 함께 업데이트**

overrides를 제거하면 `@tailwindcss/vite`가 자연스럽게 Vite 8을 해석하게 되고, Astro도 Vite 8 위에서 동작하므로 충돌 없이 전환된다.

## 참고 링크

**Vite**

- [Vite 8.0 릴리스 공지](https://vite.dev/blog/announcing-vite8)

**Tailwind CSS**

- [Tailwind CSS v4.2.2 릴리스 노트](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.2.2)
- [Discussion #19624 — How to use tailwindcss/vite with vite 8](https://github.com/tailwindlabs/tailwindcss/discussions/19624)
- [Issue #19798 — @tailwindcss/vite incompatible with Vite 8 dependency](https://github.com/tailwindlabs/tailwindcss/issues/19798)
- [Issue #19792 — LightningCSS breaking change with Vite 8?](https://github.com/tailwindlabs/tailwindcss/issues/19792)
- [PR #19790 — Add support for Vite 8 in @tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss/pull/19790)

**Astro**

- [Astro 6.1 릴리스](https://astro.build/blog/astro-610/)
- [PR #16062 — Warn when Vite 8 is detected, pin Vite 7 for Cloudflare adapter](https://github.com/withastro/astro/pull/16062)
- [PR #15819 — Update to Vite 8 (진행 중)](https://github.com/withastro/astro/pull/15819)
- [Issue #14030 — Astro not working with latest TailwindCSS (Vite 7 Plugin 타입 충돌)](https://github.com/withastro/astro/issues/14030)
