import { searchPagefind } from './pagefind';
import type { PagefindResultData } from './pagefind';

/* ── 결과 렌더링 ──────────────────────────────────── */

function toPlainText(value?: string): string {
  if (!value) return '';

  const doc = new DOMParser().parseFromString(value, 'text/html');

  return doc.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function renderResults(
  list: HTMLUListElement,
  empty: HTMLElement | null,
  items: PagefindResultData[]
): void {
  list.replaceChildren();

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
      'search-result block rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-base-200/70 focus-visible:bg-base-200/70 focus-visible:outline-none motion-reduce:transition-none';
    a.setAttribute('data-search-result', '');

    const title = document.createElement('span');
    title.className = 'text-sm font-semibold';
    title.textContent = item.meta?.title ?? item.url;

    const excerpt = document.createElement('span');
    excerpt.className = 'mt-1 block line-clamp-2 text-sm opacity-60';
    excerpt.textContent = toPlainText(item.excerpt);

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
  for (const result of results) {
    result.classList.remove('bg-base-200/70');
  }

  const activeResult = results[index];

  if (activeResult) {
    activeResult.classList.add('bg-base-200/70');
    activeResult.focus({ preventScroll: true });
    activeResult.scrollIntoView({ block: 'nearest' });
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
  const status = dialog.querySelector<HTMLElement>('[data-search-status]');
  const error = dialog.querySelector<HTMLElement>('[data-search-error]');
  const retry = dialog.querySelector<HTMLButtonElement>('[data-search-retry]');

  if (!input || !list) return;

  let timer: number | null = null;
  let requestId = 0;
  let lastQuery = '';
  let activeIndex = -1;
  let returnFocus: HTMLElement | null = null;

  const announce = (message: string, busy = false) => {
    if (status) status.textContent = message;
    list.setAttribute('aria-busy', String(busy));
  };

  const clearResults = () => {
    list.replaceChildren();
    activeIndex = -1;
    if (empty) empty.hidden = true;
    if (error) error.hidden = true;
  };

  /* open / close ─────────────────────────────────── */

  const reset = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    requestId += 1;
    input.value = '';
    lastQuery = '';
    clearResults();
    announce('검색어를 입력해 주세요.');
  };

  const open = () => {
    if (!dialog.open) {
      returnFocus = document.activeElement as HTMLElement | null;
      reset();
      dialog.showModal();
    }
    input.focus();
  };

  /* search + debounce ────────────────────────────── */

  const search = async (term: string) => {
    const q = term.trim();
    const currentRequestId = ++requestId;

    clearResults();
    if (!q) {
      announce('검색어를 입력해 주세요.');
      return;
    }
    announce('검색 중이에요…', true);

    try {
      const { items, total } = await searchPagefind(q);

      // 이후에 시작된 검색이 있으면 현재 결과는 무시
      if (currentRequestId !== requestId) return;

      renderResults(list, empty, items);
      announce(
        total > items.length
          ? `검색 결과 ${total}개 중 ${items.length}개를 표시해요.`
          : `검색 결과 ${total}개예요.`
      );
      activeIndex = -1;
    } catch (err) {
      if (currentRequestId !== requestId) return;

      console.error('[search]', err);

      clearResults();
      if (error) error.hidden = false;
      lastQuery = '';
      announce('검색 오류가 발생했어요. 다시 검색해 주세요.');
    }
  };

  input.addEventListener('input', () => {
    const value = input.value.trim();
    if (value === lastQuery) return;
    lastQuery = value;
    // Invalidate before debounce so older responses cannot replace a newer query.
    requestId += 1;
    clearResults();
    announce(
      value ? '검색 중이에요…' : '검색어를 입력해 주세요.',
      Boolean(value)
    );

    if (timer !== null) clearTimeout(timer);

    timer = window.setTimeout(() => {
      timer = null;

      void search(value);
    }, 150);
  });

  /* 키보드 탐색 (↑↓ Enter) ───────────────────────── */

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'
        )
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (
        first &&
        last &&
        (e.shiftKey
          ? document.activeElement === first
          : document.activeElement === last)
      ) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
      return;
    }
    if (e.isComposing) return;
    if (
      e.target !== input &&
      !(e.target instanceof Element && e.target.closest('[data-search-result]'))
    )
      return;
    const results = getResults(list);
    activeIndex = results.indexOf(document.activeElement as HTMLAnchorElement);

    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      activeIndex = activeIndex < results.length - 1 ? activeIndex + 1 : 0;
      setActive(results, activeIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      activeIndex = activeIndex > 0 ? activeIndex - 1 : results.length - 1;
      setActive(results, activeIndex);
    }
  });

  retry?.addEventListener('click', () => {
    input.focus();
    lastQuery = input.value.trim();
    void search(lastQuery);
  });

  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    reset();
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });

  document
    .querySelectorAll<HTMLButtonElement>('[data-search-open]')
    .forEach((button) => {
      button.addEventListener('click', open);
    });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    }
  });

  // 뒤로가기로 복원된 페이지에서 이전 검색 모달이 남지 않도록 처리
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      dialog.close();
      reset();
    }
  });
}

mountSearchModal();
