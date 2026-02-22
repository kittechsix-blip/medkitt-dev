// MedKitt — Service Worker
// Network-first for code, cache-first for images
// Ensures updates load immediately without manual cache clearing

const CACHE_NAME = 'medkitt-v48';

const ASSETS_TO_CACHE = [
  './',
  './app.html',
  './index.html',
  './styles.css',
  './script.js',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/app-icon.svg',
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
  './data/trees/priapism.js',
  './data/trees/chest-tube.js',
  './images/chest-tube/triangle-of-safety.png',
  './images/chest-tube/needle-over-rib.png',
  './images/chest-tube/three-bottle-system.png',
  './images/chest-tube/proper-placement-cxr.png',
  './images/priapism/cross-section.png',
  './images/priapism/penile-block.png',
  './images/priapism/injection-clock.png',
  './images/priapism/aspiration-setup.png',
  './images/priapism/aspiration-procedure.png',
  './images/priapism/mixing-instructions.png',
  './assets/app-icon-192.png',
  './assets/app-icon-512.png',
  './assets/medkitt-brand-logo.png',
  './assets/badge-48.png',
  './assets/badge-80.png',
  './assets/icons/anesthesia-airway.png',
  './assets/icons/cardiology.png',
  './assets/icons/critical-care.png',
  './assets/icons/em.png',
  './assets/icons/gi.png',
  './assets/icons/heme-onc.png',
  './assets/icons/infectious-disease.png',
  './assets/icons/med-calc.png',
  './assets/icons/nephro-rheum-endo.png',
  './assets/icons/neurology.png',
  './assets/icons/ob-gyn.png',
  './assets/icons/ortho.png',
  './assets/icons/pediatrics.png',
  './assets/icons/pharmacy.png',
  './assets/icons/procedures.png',
  './assets/icons/toxicology.png',
  './assets/icons/trauma-surg.png',
  './assets/icons/us-rads.png',
  './assets/icons/urology.png'
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

// Fetch: network-first for code/data, cache-first for images/assets
self.addEventListener('fetch', function(event) {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);

  // Images and icon assets: cache-first (large, rarely change)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(function(networkResponse) {
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
    return;
  }

  // Everything else (JS, HTML, CSS, JSON): network-first
  // Bypasses browser HTTP cache to guarantee truly fresh code
  event.respondWith(
    fetch(new Request(event.request, { cache: 'no-cache' })).then(function(networkResponse) {
      if (networkResponse && networkResponse.status === 200) {
        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(function() {
      // Offline: fall back to cache
      return caches.match(event.request);
    })
  );
});
