export type SearchItem = {
  url: string;
  title: string;
  excerpt?: string;
};

export type ControllerOptions = {
  dialogId?: string;
  inputId?: string;

  openSelector?: string;
  closeSelector?: string;

  stateId?: string;
  resultsId?: string;

  /** Pagefind generated runtime script path */
  pagefindScriptSrc?: string;

  /** Debounce for input */
  debounceMs?: number;

  /** Max number of results to render */
  maxResults?: number;

  /** dev 서버에서만 placeholder 결과 사용 */
  devPlaceholder?: boolean;

  /** dev placeholder 데이터 */
  devPlaceholderItems?: SearchItem[];
};

// ✅ Pagefind API 타입을 "명시적으로" 분리: TS가 동적 전역을 이해 못하는 문제 방지
type PagefindApi = {
  init?: () => Promise<void> | void;
  search: (
    q: string,
    opts?: any
  ) => Promise<{
    results: Array<{
      data: () => Promise<any>;
    }>;
  }>;
};

declare global {
  interface Window {
    __searchControllerMounted?: boolean;
    __openSearch?: () => void;
    __closeSearch?: () => void;

    // pagefind.js가 런타임에 주입
    pagefind?: PagefindApi;
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
}

/**
 * pagefind.js를 동적으로 로드
 * - script 태그 1회만 삽입
 * - 로드 완료까지 await
 */
async function loadPagefind(scriptSrc: string) {
  if (window.pagefind) return;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      'script[data-pagefind="true"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      // 이미 삽입된 스크립트: load 이벤트를 기다림
      if (window.pagefind) return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener(
        'error',
        () => reject(new Error('Failed to load pagefind script')),
        { once: true }
      );
      return;
    }

    const s = document.createElement('script');
    s.src = scriptSrc;
    s.async = true;
    s.dataset.pagefind = 'true';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load pagefind script'));
    document.head.appendChild(s);
  });
}

/**
 * ✅ TS 친화적인 init 호출
 * - optional chaining + 전역 객체 동적 주입 조합에서 never가 터질 수 있으니
 * - 변수에 담고 typeof 체크로 좁혀서 호출한다.
 */
async function ensurePagefindReady() {
  const pf = window.pagefind;
  if (pf && typeof pf.init === 'function') {
    await pf.init();
  }
}

function isEditableTarget(el: Element | null) {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  const editable = (el as HTMLElement).isContentEditable;
  return tag === 'input' || tag === 'textarea' || tag === 'select' || editable;
}

export function mountSearchController(options: ControllerOptions = {}) {
  if (typeof window === 'undefined') return;
  if (window.__searchControllerMounted) return;
  window.__searchControllerMounted = true;

  const {
    dialogId = 'search-dialog',
    inputId = 'search-input',
    openSelector = '[data-search-open]',
    closeSelector = '[data-search-close]',
    stateId = 'search-state',
    resultsId = 'search-results',
    pagefindScriptSrc = '/pagefind/pagefind.js',
    debounceMs = 120,
    maxResults = 8,

    devPlaceholder = false,
    devPlaceholderItems = [
      {
        url: '/blog/astro-tailwind-dark-mode',
        title: 'Astro + Tailwind 다크모드 구현',
        excerpt: 'light-dark() 기반 system + 토글',
      },
      {
        url: '/blog/rss-migration',
        title: 'Astro RSS 직접 구현 마이그레이션',
        excerpt: '@astrojs/rss → 직접 구현',
      },
      {
        url: '/blog/pagefind-search',
        title: 'Astro + Pagefind 검색 적용',
        excerpt: '정적 검색 인덱스 생성과 모달 UI',
      },
    ],
  } = options;

  const dialog = document.getElementById(dialogId);
  const input = document.getElementById(inputId);
  const stateEl = document.getElementById(stateId);
  const resultsEl = document.getElementById(resultsId);

  if (
    !(dialog instanceof HTMLDialogElement) ||
    !(input instanceof HTMLInputElement) ||
    !(stateEl instanceof HTMLElement) ||
    !(resultsEl instanceof HTMLUListElement)
  ) {
    return;
  }

  let activeIndex = -1;
  let activeLinks: HTMLAnchorElement[] = [];
  let lastQuery = '';

  const setState = (text: string) => {
    stateEl.textContent = text;
    stateEl.classList.remove('hidden');
    resultsEl.classList.add('hidden');
  };

  const showResults = () => {
    stateEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
  };

  const clearResults = () => {
    resultsEl.innerHTML = '';
    activeLinks = [];
    activeIndex = -1;
  };

  const openSearch = () => {
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => input.focus());
  };

  const closeSearch = () => {
    if (dialog.open) dialog.close();
  };

  // 외부에서 열/닫 (선택)
  window.__openSearch = openSearch;
  window.__closeSearch = closeSearch;

  // 클릭 트리거
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;

    if (target?.closest(openSelector)) {
      e.preventDefault();
      openSearch();
      return;
    }

    if (target?.closest(closeSelector)) {
      e.preventDefault();
      closeSearch();
      return;
    }
  });

  // 패널 밖 클릭 닫기
  dialog.addEventListener('click', (e) => {
    const panel = dialog.querySelector('[data-search-panel]');
    if (panel instanceof HTMLElement && !panel.contains(e.target as Node)) {
      closeSearch();
    }
  });

  // ESC (cancel 이벤트 통일)
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeSearch();
  });

  // Ctrl/Cmd + K
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const meta = e.metaKey || e.ctrlKey;

    if (meta && key === 'k') {
      if (
        !dialog.open &&
        isEditableTarget(document.activeElement as Element | null)
      )
        return;
      e.preventDefault();
      openSearch();
      return;
    }

    if (key === 'escape' && dialog.open) {
      e.preventDefault();
      closeSearch();
    }
  });

  // 결과 키보드 네비 (↑↓/Enter)
  dialog.addEventListener('keydown', (e) => {
    if (resultsEl.classList.contains('hidden')) return;
    if (!activeLinks.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, activeLinks.length - 1);
      activeLinks[activeIndex]?.focus();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      activeLinks[activeIndex]?.focus();
      return;
    }

    if (e.key === 'Enter') {
      const a = activeLinks[activeIndex];
      if (a) {
        e.preventDefault();
        a.click();
      }
    }
  });

  const render = (items: SearchItem[]) => {
    clearResults();

    const lis = items.slice(0, maxResults).map((it, idx) => {
      const title = escapeHtml(it.title || it.url);
      const excerpt = it.excerpt ? escapeHtml(it.excerpt) : '';

      return `
<li class="px-2">
  <a
    href="${it.url}"
    class="block rounded-xl px-3 py-3 outline-none hover:bg-search-modal-hover focus:bg-search-modal-hover"
    data-search-link
    data-index="${idx}"
  >
    <div class="text-sm font-medium text-search-modal-text">${title}</div>
    ${excerpt ? `<div class="mt-1 text-xs text-search-modal-subtext">${excerpt}</div>` : ``}
  </a>
</li>`;
    });

    resultsEl.innerHTML = `<div class="py-1">${lis.join('')}</div>`;
    activeLinks = Array.from(
      resultsEl.querySelectorAll<HTMLAnchorElement>('a[data-search-link]')
    );
    activeIndex = activeLinks.length ? 0 : -1;

    showResults();
  };

  const searchDevPlaceholder = (query: string) => {
    const q = query.toLowerCase();
    const filtered = devPlaceholderItems.filter((item) =>
      item.title.toLowerCase().includes(q)
    );

    if (!filtered.length) {
      clearResults();
      setState('No results (dev)');
      return;
    }

    render(filtered);
  };

  const searchPagefind = async (query: string) => {
    setState('Searching…');

    try {
      await loadPagefind(pagefindScriptSrc);
      await ensurePagefindReady();

      const pf = window.pagefind;
      if (!pf) throw new Error('pagefind not available');

      const res = await pf.search(query);

      // query가 바뀌었으면 결과 폐기
      if (lastQuery !== query) return;

      const raw = res.results.slice(0, maxResults);
      const dataList = await Promise.all(raw.map((r) => r.data()));

      const items: SearchItem[] = dataList.map((d: any) => ({
        url: d.url || d?.route || '#',
        title: d?.meta?.title || d?.title || d.url,
        excerpt: d?.excerpt || '',
      }));

      if (!items.length) {
        clearResults();
        setState('No results');
        return;
      }

      render(items);
    } catch (err) {
      clearResults();
      setState('Search unavailable (Pagefind index missing)');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const search = async (q: string) => {
    const query = q.trim();
    lastQuery = query;

    if (!query) {
      clearResults();
      setState('Type to search…');
      return;
    }

    // ✅ dev에서만 placeholder 옵션
    if (import.meta.env.DEV && devPlaceholder) {
      searchDevPlaceholder(query);
      return;
    }

    await searchPagefind(query);
  };

  const runSearch = debounce(() => {
    void search(input.value);
  }, debounceMs);

  input.addEventListener('input', runSearch);

  // 모달 닫힐 때 초기화
  dialog.addEventListener('close', () => {
    input.value = '';
    lastQuery = '';
    clearResults();
    setState('Type to search…');
  });

  // 최초 상태
  setState('Type to search…');
}
