import { onPageReady } from '@/lib/lifecycle';
import { searchPagefind } from './pagefind';
import type { PagefindResultData } from './pagefind';

/* ── 결과 렌더링 ──────────────────────────────────── */

function renderResults(
  list: HTMLUListElement,
  empty: HTMLElement | null,
  items: PagefindResultData[]
): void {
  list.innerHTML = '';

  if (items.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

  for (const item of items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.className =
      'block rounded-md p-3 hover:bg-base-200 transition-colors search-result';
    a.setAttribute('data-search-result', '');

    const title = document.createElement('span');
    title.className = 'text-sm font-medium';
    title.textContent = item.meta?.title ?? item.url;

    const excerpt = document.createElement('span');
    excerpt.className = 'mt-1 block text-sm opacity-60 line-clamp-2';
    excerpt.innerHTML = item.excerpt ?? '';

    a.append(title, excerpt);
    li.appendChild(a);
    list.appendChild(li);
  }
}

/* ── 키보드 탐색 ──────────────────────────────────── */

function getResults(list: HTMLUListElement): HTMLAnchorElement[] {
  return Array.from(
    list.querySelectorAll<HTMLAnchorElement>('[data-search-result]')
  );
}

function setActive(results: HTMLAnchorElement[], index: number): void {
  for (const r of results) r.classList.remove('bg-base-200');
  if (results[index]) {
    results[index].classList.add('bg-base-200');
    results[index].scrollIntoView({ block: 'nearest' });
  }
}

/* ── 모달 마운트 ──────────────────────────────────── */

let currentOpen: (() => void) | null = null;

function mountSearchModal(): void {
  const dialog = document.querySelector<HTMLDialogElement>(
    '[data-search-modal]'
  );
  if (!dialog) return;

  const input = dialog.querySelector<HTMLInputElement>('[data-search-input]');
  const list = dialog.querySelector<HTMLUListElement>('[data-results]');
  const empty = dialog.querySelector<HTMLElement>('[data-empty]');
  const closeBtn = dialog.querySelector<HTMLButtonElement>(
    '[data-search-close]'
  );
  if (!input || !list) return;

  let timer: number | null = null;
  let lastQuery = '';
  let activeIndex = -1;

  /* open / close ─────────────────────────────────── */

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.value = '';
    lastQuery = '';
    activeIndex = -1;
    list.innerHTML = '';
    if (empty) empty.hidden = true;
    queueMicrotask(() => input.focus());
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  /* search + debounce ────────────────────────────── */

  const search = async (term: string) => {
    const q = term.trim();
    if (!q) {
      list.innerHTML = '';
      if (empty) empty.hidden = true;
      activeIndex = -1;
      return;
    }
    try {
      const results = await searchPagefind(q);
      renderResults(list, empty, results);
      activeIndex = -1;
    } catch (err) {
      console.error('[search]', err);
      renderResults(list, empty, []);
      activeIndex = -1;
    }
  };

  input.addEventListener('input', () => {
    const value = input.value;
    if (timer !== null) clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (value === lastQuery) return;
      lastQuery = value;
      search(value);
    }, 150);
  });

  /* 키보드 탐색 (↑↓ Enter) ───────────────────────── */

  input.addEventListener('keydown', (e) => {
    const results = getResults(list);
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = activeIndex < results.length - 1 ? activeIndex + 1 : 0;
      setActive(results, activeIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = activeIndex > 0 ? activeIndex - 1 : results.length - 1;
      setActive(results, activeIndex);
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      results[activeIndex].click();
    }
  });

  /* 모바일 닫기 버튼 ────────────────────────────── */

  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }

  /* 매 swap마다 새 dialog의 open()을 노출 */
  currentOpen = open;
}

/* ── 전역 리스너 (1회만 등록) ──────────────────────── */

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    currentOpen?.();
  }
});

window.addEventListener('search:open', () => currentOpen?.());

/* ── 초기 + swap 마운트 ───────────────────────────── */

onPageReady(mountSearchModal);
