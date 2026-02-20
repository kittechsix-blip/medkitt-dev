// EM Decision Trees — Service Worker
// Cache-first offline strategy

const CACHE_NAME = 'em-medkitt-v22';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon.svg',
  './services/router.js',
  './components/category-grid.js',
  './components/category-view.js',
  './data/categories.js',
  './data/trees/neurosyphilis.js',
  './services/storage.js',
  './services/tree-engine.js',
  './components/tree-wizard.js',

  './components/reference-table.js',
  './data/trees/pneumothorax.js',
  './data/trees/pe-treatment.js',
  './components/calculator.js',
  './components/info-page.js',
  './components/drug-store.js',
  './data/drug-store.js',
  './images/pneumothorax/us-anatomy.png',
  './images/pneumothorax/b-lines.png',
  './images/pneumothorax/lung-point.png',
  './images/pneumothorax/m-mode-barcode.png',
  './data/trees/echo-views.js',
  './images/echo-views/probe.png',
  './images/echo-views/clock-diagram.png',
  './images/echo-views/focus-overview.png',
  './images/echo-views/better-views-tips.png',
  './images/echo-views/plax-labeled.png',
  './images/echo-views/psax-anatomy.png',
  './images/echo-views/a4c-anatomy.png',
  './images/echo-views/subxiphoid-view.png',
  './images/echo-views/ivc-labeled.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: pre-cache all static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first, network-fallback
self.addEventListener('fetch', function(event) {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(function(networkResponse) {
        // Cache successful responses for future offline use
        if (networkResponse && networkResponse.status === 200) {
          var responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
