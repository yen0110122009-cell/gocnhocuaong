const CACHE_NAME = 'gocnhocuaong-pwa-v11';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/app.css?v=11',
  './assets/js/app.js',
  './assets/js/sw-register.js?v=11',
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png'
];

const toUrl = path => new URL(path, self.registration.scope).toString();

async function cacheAsset(cache, path) {
  const url = new URL(path, self.registration.scope);
  url.searchParams.set('sw-refresh', CACHE_NAME);
  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) throw new Error(`Không thể tải tài nguyên PWA: ${path}`);
  await cache.put(toUrl(path), response);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(PRECACHE.map(path => cacheAsset(cache, path))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('gocnhocuaong-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallbackPath) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || (await cache.match(toUrl(fallbackPath)));
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate' || request.destination === 'document';
  const isAppScript = url.pathname.endsWith('/assets/js/app.js');
  const isPwaAsset = url.pathname.endsWith('/manifest.webmanifest') ||
    url.pathname.endsWith('/assets/css/app.css') ||
    url.pathname.endsWith('/assets/js/sw-register.js') ||
    url.pathname.endsWith('/assets/pwa/icon-192.png') ||
    url.pathname.endsWith('/assets/pwa/icon-512.png');

  if (isNavigation) {
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  if (isAppScript) {
    event.respondWith(networkFirst(request, './assets/js/app.js'));
    return;
  }

  if (isPwaAsset) event.respondWith(cacheFirst(request));
});
