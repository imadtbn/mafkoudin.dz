(() => {
  const config = Object.freeze({
    ga4Id: 'G-2R9CE6PH9K',
    adsenseClient: 'ca-pub-5656416032906373'
  });

  const hasScript = (needle) => Array.from(document.scripts).some((script) => script.src.includes(needle));
  const loadScriptOnce = (src, attributes = {}) => new Promise((resolve, reject) => {
    if (hasScript(src)) return resolve();
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`تعذر تحميل المورد: ${src}`));
    document.head.append(script);
  });

  const enableAnalytics = () => {
    if (window.__mafkoudinGa4Loaded) return;
    window.__mafkoudinGa4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.ga4Id, { anonymize_ip: true });
    loadScriptOnce(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4Id)}`).catch(() => undefined);
  };

  const enableAds = () => {
    const units = Array.from(document.querySelectorAll(`ins.adsbygoogle[data-ad-client="${config.adsenseClient}"]`));
    if (!units.length || window.__mafkoudinAdsenseLoaded) return;
    window.__mafkoudinAdsenseLoaded = true;
    loadScriptOnce(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.adsenseClient)}`,
      { crossorigin: 'anonymous' }
    ).then(() => {
      units.forEach((unit) => {
        if (unit.dataset.adsbygoogleStatus) return;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_) {
          // لا نمنع محتوى البلاغ إذا حجبت المتصفحات شبكة الإعلانات.
        }
      });
    }).catch(() => undefined);
  };

  enableAnalytics();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enableAds, { once: true });
  } else {
    enableAds();
  }
})();
