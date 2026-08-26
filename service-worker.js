const CACHE_NAME = 'mafkoudin-dz-pwa-v1';
const BASE_PATH = '/mafkoudin.dz/';
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}offline.html`,
  `${BASE_PATH}site.webmanifest`,
  `${BASE_PATH}css/style.css?v=global-rtl-ads-6`,
  `${BASE_PATH}js/main.js?v=report-meta-page-2`,
  `${BASE_PATH}js/pwa.js`,
  `${BASE_PATH}js/api-config.js`,
  `${BASE_PATH}assets/brand-mark.svg`,
  `${BASE_PATH}assets/favicon.svg`,
  `${BASE_PATH}assets/pwa-icon-192.png`,
  `${BASE_PATH}assets/pwa-icon-512.png`
];

const isPublicApiRequest = (url) => url.origin === 'https://mafadmin-guwxgghh.manus.space' && url.pathname.startsWith('/api/public/');
const isSameSiteAsset = (request, url) => url.origin === self.location.origin && ['style', 'script', 'image', 'font'].includes(request.destination);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || isPublicApiRequest(url) || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(`${BASE_PATH}offline.html`)))
    );
    return;
  }

  if (isSameSiteAsset(request, url)) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cached) => {
        const update = fetch(request).then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        });
        event.waitUntil(update.catch(() => undefined));
        return cached || update;
      })
    );
  }
});
