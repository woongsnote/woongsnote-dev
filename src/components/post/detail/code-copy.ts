/** Keep a fallback for browsers without the asynchronous Clipboard API. */
async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const focused = document.activeElement as HTMLElement | null;
  const selection = window.getSelection();
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, i) =>
        selection.getRangeAt(i).cloneRange()
      )
    : [];
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;inset:0 auto auto:-9999px';
  document.body.append(field);
  try {
    field.select();
    if (!document.execCommand('copy')) throw new Error('Copy unavailable');
  } finally {
    field.remove();
    focused?.focus({ preventScroll: true });
    selection?.removeAllRanges();
    ranges.forEach((range) => selection?.addRange(range));
  }
}

const copyStatus = document.querySelector<HTMLElement>(
  '[data-code-copy-status]'
);

document
  .querySelectorAll<HTMLElement>('[data-post-body] pre')
  .forEach((pre, index) => {
    const code = pre.querySelector('code');
    if (!code) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.before(wrapper);
    wrapper.append(pre);
    pre.tabIndex = 0;
    pre.setAttribute('role', 'region');
    pre.setAttribute('aria-label', `코드 블록 ${index + 1} (좌우 스크롤 가능)`);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy focus-ring';
    button.textContent = '복사';
    button.setAttribute('aria-label', `코드 블록 ${index + 1} 복사`);
    button.setAttribute('data-pagefind-ignore', '');
    wrapper.append(button);

    let timer: number | undefined;
    button.addEventListener('click', async () => {
      window.clearTimeout(timer);
      button.disabled = true;
      if (copyStatus) copyStatus.textContent = '';
      try {
        await copyText(code.textContent ?? '');
        button.textContent = '복사됨';
        if (copyStatus)
          copyStatus.textContent = `코드 블록 ${index + 1}을 복사했어요.`;
      } catch {
        button.textContent = '복사 실패';
        if (copyStatus)
          copyStatus.textContent =
            '복사하지 못했어요. 코드를 선택해 직접 복사해 주세요.';
      } finally {
        button.disabled = false;
        timer = window.setTimeout(() => {
          button.textContent = '복사';
        }, 2500);
      }
    });
  });

export {};
