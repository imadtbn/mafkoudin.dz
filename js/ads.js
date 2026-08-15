(() => {
  const activateAds = () => {
    if (!window.adsbygoogle) window.adsbygoogle = [];
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach((slot) => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('AdSense slot could not be initialized:', error);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activateAds, { once: true });
  } else {
    activateAds();
  }
})();
