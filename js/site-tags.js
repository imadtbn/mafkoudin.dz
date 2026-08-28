(() => {
  const TAG_CONFIG = Object.freeze({
    gtmId: 'GTM-M2PN233N',
    ga4Id: 'G-2R9CE6PH9K',
    ga4Mode: 'gtm',
    adsenseClient: 'ca-pub-5656416032906373'
  });

  const isConfigured = (value) => typeof value === 'string' && value.trim() && !/^x+$/i.test(value.trim());
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

  const enableTagManager = () => {
    if (!isConfigured(TAG_CONFIG.gtmId) || window.__mafkoudinGtmLoaded) return;
    window.__mafkoudinGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    loadScriptOnce(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(TAG_CONFIG.gtmId)}`).catch(() => undefined);
  };

  const scheduleAds = (callback) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1800 });
    } else {
      window.setTimeout(callback, 900);
    }
  };

  const enableAds = () => {
    const units = Array.from(document.querySelectorAll(`ins.adsbygoogle[data-ad-client="${TAG_CONFIG.adsenseClient}"]`));
    if (!isConfigured(TAG_CONFIG.adsenseClient) || !units.length || window.__mafkoudinAdsenseLoaded) return;
    window.__mafkoudinAdsenseLoaded = true;
    loadScriptOnce(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(TAG_CONFIG.adsenseClient)}`,
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

  const deferAdsUntilVisible = () => {
    const units = Array.from(document.querySelectorAll(`ins.adsbygoogle[data-ad-client="${TAG_CONFIG.adsenseClient}"]`));
    if (!units.length) return;
    if (!('IntersectionObserver' in window)) return scheduleAds(enableAds);
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      scheduleAds(enableAds);
    }, { rootMargin: '240px 0px' });
    units.forEach((unit) => observer.observe(unit));
  };

  enableTagManager();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deferAdsUntilVisible, { once: true });
  } else {
    deferAdsUntilVisible();
  }
})();
