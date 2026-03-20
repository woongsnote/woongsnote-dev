import { searchPagefind } from './pagefind';
import type { PagefindResultData } from './pagefind';

/* ── 결과 렌더링 ──────────────────────────────────── */

function renderResults(
  list: HTMLUListElement,
  empty: HTMLElement | null,
  items: PagefindResultData[]
): void {
  list.innerHTML = '';
  if (empty) empty.hidden = items.length === 0 ? false : true;

  for (const item of items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.className = 'block rounded-lg p-3 hover:bg-base-200 transition-colors';

    const title = document.createElement('span');
    title.className = 'text-sm font-medium';
    title.textContent = item.meta?.title ?? item.url;

    const excerpt = document.createElement('span');
    excerpt.className = 'mt-1 block text-sm opacity-60 line-clamp-2';
    excerpt.innerHTML = item.excerpt ?? ''; // <mark> 하이라이트 유지

    a.append(title, excerpt);
    li.appendChild(a);
    list.appendChild(li);
  }
}

/* ── 모달 마운트 ──────────────────────────────────── */

function mountSearchModal(): void {
  const dialog = document.querySelector<HTMLDialogElement>(
    '[data-search-modal]'
  );
  if (!dialog) return;

  const input = dialog.querySelector<HTMLInputElement>('[data-search-input]');
  const list = dialog.querySelector<HTMLUListElement>('[data-results]');
  const empty = dialog.querySelector<HTMLElement>('[data-empty]');
  if (!input || !list) return;

  let timer: number | null = null;
  let lastQuery = '';

  /* open / close ─────────────────────────────────── */

  const open = () => {
    if (!dialog.open) dialog.showModal();
    queueMicrotask(() => input.focus());
  };

  /* search + debounce ────────────────────────────── */

  const search = async (term: string) => {
    const q = term.trim();
    if (!q) {
      renderResults(list, empty, []);
      if (empty) empty.hidden = true;
      return;
    }
    try {
      const results = await searchPagefind(q);
      renderResults(list, empty, results);
    } catch (err) {
      console.error('[search]', err);
      renderResults(list, empty, []);
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

  /* ⌘K / Ctrl+K ─────────────────────────────────── */

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    }
  });

  /* SearchButton 연동 (CustomEvent) ──────────────── */

  window.addEventListener('search:open', open);
}

/* ── 중복 마운트 방지 후 즉시 실행 ────────────────── */

const FLAG = '__search_modal_mounted__';

if (!(window as unknown as Record<string, boolean>)[FLAG]) {
  (window as unknown as Record<string, boolean>)[FLAG] = true;
  mountSearchModal();
}
