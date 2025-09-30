const CACHE_NAME = 'betti-v1';
const OFFLINE_URLS = [
  '/', 
  '/IMAGES/IMG_4972.webp'
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
  const { request } = event;

  // Only handle GET requests to our own origin
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((networkResp) => {
        // Save a copy in cache
        const copy = networkResp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return networkResp;
      })
      .catch(() => caches.match(request))
  );
});
