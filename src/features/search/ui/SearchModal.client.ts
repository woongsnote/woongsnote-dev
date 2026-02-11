import { searchPagefind } from '../lib/pagefind-client';
import type { PagefindSearchResult } from '../lib/pagefind.types';

function qs<T extends Element>(root: ParentNode, sel: string, guard: (el: Element) => el is T, msg: string): T {
  const el = root.querySelector(sel);
  if (!el || !guard(el)) throw new Error(msg);
  return el;
}

function isHTMLElement(el: Element): el is HTMLElement {
  return el instanceof HTMLElement;
}
function isHTMLInput(el: Element): el is HTMLInputElement {
  return el instanceof HTMLInputElement;
}
function isHTMLUList(el: Element): el is HTMLUListElement {
  return el instanceof HTMLUListElement;
}

function getRoot(): HTMLElement {
  const el = document.querySelector('[data-search-modal]');
  if (!el || !(el instanceof HTMLElement)) throw new Error('SearchModal root not found');
  return el;
}

function renderItems(listNode: HTMLUListElement, emptyNode: HTMLElement | null, items: PagefindSearchResult[]): void {
  listNode.innerHTML = '';

  const showEmpty = items.length === 0;
  if (emptyNode) emptyNode.toggleAttribute('hidden', !showEmpty);

  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'rounded-lg border p-3 hover:bg-secondary/40';
    li.innerHTML = `
      <a class="block" href="${item.url}">
        <div class="text-sm font-medium">${item.url}</div>
        <div class="mt-1 text-sm text-sub line-clamp-2">${item.excerpt ?? ''}</div>
      </a>
    `;
    listNode.appendChild(li);
  }
}

export function mountSearchModal(): void {
  const root = getRoot();

  const inputNode = qs(root, '[data-search-input]', isHTMLInput, 'Search input not found');
  const listNode = qs(root, '[data-results]', isHTMLUList, 'Results list not found');

  const emptyCandidate = root.querySelector('[data-empty]');
  const emptyNode = emptyCandidate && isHTMLElement(emptyCandidate) ? emptyCandidate : null;

  const closeNodes = Array.from(root.querySelectorAll('[data-close]')).filter(isHTMLElement);

  let isOpen = false;
  let timer: number | null = null;
  let last = '';

  const setOpen = (next: boolean) => {
    isOpen = next;
    root.classList.toggle('hidden', !isOpen);
    root.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) queueMicrotask(() => inputNode.focus());
  };

  const runSearch = async (term: string) => {
    const q = term.trim();
    if (!q) {
      renderItems(listNode, emptyNode, []);
      if (emptyNode) emptyNode.setAttribute('hidden', '');
      return;
    }

    const results = await searchPagefind(q);
    renderItems(listNode, emptyNode, results.slice(0, 10));
  };

  const debounce = (term: string) => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (term === last) return;
      last = term;
      runSearch(term).catch(() => renderItems(listNode, emptyNode, []));
    }, 120);
  };

  // shortcuts
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const isK = e.key.toLowerCase() === 'k';
    const isCmdK = (e.metaKey || e.ctrlKey) && isK;

    if (isCmdK) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if (e.key === 'Escape' && isOpen) setOpen(false);
  });

  closeNodes.forEach((n) => n.addEventListener('click', () => setOpen(false)));

  inputNode.addEventListener('input', () => debounce(inputNode.value));
}

// ✅ 즉시 마운트(중복 마운트 방지)
const KEY = '__search_modal_mounted__';
const w = window as unknown as Record<string, unknown>;
if (!w[KEY]) {
  w[KEY] = true;
  mountSearchModal();
}
