export const sharePost = async (title: string, url: string) => {
  const shareData = { title, url };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareUrl = encodeURIComponent(url);
      const shareTitle = encodeURIComponent(title);

      const shareOptions = [
        {
          name: 'Facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        },
        {
          name: 'LinkedIn',
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`,
        },
        {
          name: 'Reddit',
          url: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
        },
        {
          name: 'Email',
          url: `mailto:?subject=${shareTitle}&body=Check out this link: ${url}`,
        },
      ];

      const shareMenu = document.createElement('div');
      shareMenu.className =
        'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg z-50';

      shareOptions.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = `Share on ${option.name}`;
        button.className =
          'w-full py-2 px-4 mb-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors';
        button.onclick = () => {
          window.open(option.url, '_blank');
          document.body.removeChild(shareMenu);
        };
        shareMenu.appendChild(button);
      });

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.className =
        'w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition-colors';
      closeButton.onclick = () => document.body.removeChild(shareMenu);
      shareMenu.appendChild(closeButton);

      document.body.appendChild(shareMenu);
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
};
