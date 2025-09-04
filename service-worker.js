const CACHE_NAME = 'beachgirl-v1.0.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/age-verification.html',
    '/gallery.html',
    '/premium.html',
    '/videos.html',
    '/subscription.html',
    '/content-data1.js',
    '/content-data2.js',
    '/content-data3.js',
    '/content-data4.js',
    '/content-data5.js',
    '/content-data6.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    // Don't cache videos - stream directly
    if (event.request.url.includes('.mp4')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
