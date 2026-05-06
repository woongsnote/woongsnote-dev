// src/lib/lifecycle.ts
// ─── Astro View Transitions 라이프사이클 헬퍼 ───

/**
 * 페이지 첫 로드와 ClientRouter swap 후 모두 콜백 실행.
 *
 * View Transitions에서 페이지 전환은 `astro:after-swap` 이벤트로 알려지며,
 * 새 DOM이 들어왔으므로 인터랙티브 컴포넌트는 매번 다시 바인딩되어야 한다.
 * 이 헬퍼는 그 표준 패턴(`fn()` + `addEventListener('astro:after-swap', fn)`)을
 * 한 줄로 줄여준다.
 *
 * @example
 * ```ts
 * import { onPageReady } from '@/lib/lifecycle';
 * onPageReady(bindMyComponent);
 * ```
 */
export function onPageReady(callback: () => void): void {
  callback();
  document.addEventListener('astro:after-swap', callback);
}
