const CACHE_NAME = 'betti-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/thank-you.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/logo.svg',
  '/js/workingDaysBetween.js',
  '/IMAGES/IMG_4972.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

// Activate: cleanup old caches if you bump CACHE_NAME later
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first with cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResp) => {
        if (networkResp.ok) {
          const copy = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return networkResp;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return cache.match('/offline.html');
        }
      })
  );
});