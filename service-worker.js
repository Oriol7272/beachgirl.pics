const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `beachgirl-${CACHE_VERSION}`;

const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/styles.css',
  '/content-data1.js',
  '/content-data2.js', 
  '/content-data3.js',
  '/content-data4.js',
  '/content-data5.js',
  '/content-data6.js'
];

const CACHE_PATTERNS = {
  images: /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i,
  videos: /\.(mp4|webm|ogg)$/i,
  scripts: /\.(js)$/i,
  styles: /\.(css)$/i
};

const NO_CACHE_PATTERNS = [
  /\/api\//,
  /paypal|stripe|payment/,
  /google|analytics|tag/,
  /ads|doubleclick/,
  /magsrv|jads|easrv|premiumvertising/
];

self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Install failed:', err))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  if (!url.protocol.startsWith('http')) return;
  if (NO_CACHE_PATTERNS.some(p => p.test(url.href))) return;
  
  // Videos - manejo especial
  if (CACHE_PATTERNS.videos.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) return cached;
          return fetch(request, { signal: AbortSignal.timeout(30000) })
            .then(response => {
              if (response.ok) {
                const size = response.headers.get('content-length');
                if (!size || parseInt(size) < 10485760) {
                  const cache = caches.open(CACHE_NAME);
                  cache.then(c => c.put(request, response.clone()));
                }
              }
              return response;
            })
            .catch(err => {
              console.warn('[SW] Video fetch error:', url.pathname);
              return new Response('Video unavailable', { status: 503 });
            });
        })
    );
    return;
  }
  
  // Otros recursos
  if (CACHE_PATTERNS.images.test(url.pathname) || 
      CACHE_PATTERNS.scripts.test(url.pathname) ||
      CACHE_PATTERNS.styles.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cached => cached || fetch(request).then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          }
          return response;
        }))
        .catch(() => caches.match(request))
    );
  }
});
