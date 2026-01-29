export function initBackToTop() {
  const el = document.getElementById('back-to-top');
  if (!el) return;

  const backToTopButton = el as HTMLButtonElement; // ✅ 여기서 확정

  let lastScrollY = window.scrollY;

  const toggleBackToTopButton = () => {
    const currentScrollY = window.scrollY;

    const isPastThreshold = currentScrollY > 300;
    const isScrollingUp = currentScrollY < lastScrollY;

    if (isPastThreshold && isScrollingUp) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }

    lastScrollY = currentScrollY;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', toggleBackToTopButton, { passive: true });
  backToTopButton.addEventListener('click', scrollToTop);
}
