const CACHE_NAME = 'daily-mate-cache-v1';
const urlsToCache = [
  'index.html',
  'shop.html',
  'rechner.html',
  'style.css',
  'script.js',
  'shop.js',
  'rechner.js',
  'images/wave-up.png',
  'images/wave-down.png',
  'images/add.svg',
  'images/delete.svg',
  'images/basket.svg',
  'images/calculator.svg',
  'images/list.svg',
  'manifest.json',
  'images/icon-192x192.png',
  'images/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
