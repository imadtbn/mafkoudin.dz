const BASE_PATH = new URL('./', self.registration.scope).pathname;
const CACHE_NAME = 'mafkoudin-dz-shell-v9';
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}css/style.css`,
  `${BASE_PATH}js/main.js`,
  `${BASE_PATH}js/api-config.js?v=report-submit-v5`,
  `${BASE_PATH}js/main.js?v=report-submit-v5`,
  `${BASE_PATH}js/report-submission.js?v=report-submit-v5`,
  `${BASE_PATH}js/ads.js`,
  `${BASE_PATH}pages/report.html`,
  `${BASE_PATH}data.json`,
  `${BASE_PATH}dataperdu.json`,
  `${BASE_PATH}assets/favicon.svg`,
  `${BASE_PATH}assets/brand-mark.svg`,
  `${BASE_PATH}assets/apple-touch-icon.png`,
  `${BASE_PATH}assets/og-image.png`
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(BASE_PATH)))
  );
});
