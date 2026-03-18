export const sharePost = async (title: string, url: string) => {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      // 복사 완료 피드백 (toast 등)
    }
  } catch (err) {
    if ((err as DOMException).name !== 'AbortError') {
      console.error('공유 실패:', err);
    }
  }
};