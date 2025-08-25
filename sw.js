const CACHE_NAME = 'betti-v1';
const OFFLINE_URLS = ['/', '/IMAGES/IMG_4972.webp'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      const fetchPromise = fetch(e.request).then(networkResp => {
        const copy = networkResp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
        return networkResp;
      }).catch(() => resp);
      return resp || fetchPromise;
    })
  );
});
