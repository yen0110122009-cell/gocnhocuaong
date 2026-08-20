const STATIC_CACHE = 'gocnhocuaong-static-v5';
const STATIC_ASSETS = [
  './assets/css/app.css',
  './assets/js/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async cache => {
      await Promise.all(STATIC_ASSETS.map(async asset => {
        const url = new URL(asset, self.registration.scope);
        url.searchParams.set('sw-refresh', STATIC_CACHE);
        const response = await fetch(url.toString(), { cache: 'reload' });
        if (!response.ok) throw new Error(`Không thể tải asset: ${asset}`);
        await cache.put(new Request(new URL(asset, self.registration.scope).toString()), response);
      }));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('gocnhocuaong-static-') && key !== STATIC_CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isStaticAsset = isSameOrigin &&
    (url.pathname.endsWith('/assets/css/app.css') || url.pathname.endsWith('/assets/js/app.js'));
  if (!isStaticAsset) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(async cache => {
      const cached = await cache.match(request);
      const isAppScript = url.pathname.endsWith('/assets/js/app.js');
      if (isAppScript) {
        try {
          const response = await fetch(request, {cache:'no-store'});
          if (response && response.ok) await cache.put(request, response.clone());
          return response;
        } catch (error) {
          return cached || fetch(request);
        }
      }
      if (cached) return cached;
      const response = await fetch(request);
      if (response && response.ok) await cache.put(request, response.clone());
      return response;
    })
  );
});
