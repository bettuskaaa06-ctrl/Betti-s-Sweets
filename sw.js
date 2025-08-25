self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('betti-v1').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/IMAGES/IMG_4972.jpg',
      '/IMAGES/IMG_4972.webp'
    ]))
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => resp || fetch(e.request))
  );
});
