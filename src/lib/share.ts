export const copyText = async (text: string): Promise<void> => {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard API is unavailable.');
  }

  await navigator.clipboard.writeText(text);
};

export const sharePost = async (title: string, url: string) => {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await copyText(url);
    }
  } catch (error) {
    if ((error as DOMException).name !== 'AbortError') {
      console.error('공유 실패:', error);
    }
  }
};
