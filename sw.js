const v3 = 'lonnsteller-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(v3).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== v3).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for app-skallet, med nettverks-fallback.
// Google Fonts hentes fra nett når tilgjengelig og caches løpende.
self.addEventListener('fetch', (event) => {
  const req = event.request;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && req.method === 'GET') {
            const resClone = res.clone();
            caches.open(v3).then((cache) => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
