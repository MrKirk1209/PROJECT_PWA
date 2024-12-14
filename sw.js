const staticCacheName = 'site-static-v1'
const assets = [
    '.',
    'index.html',
    'app.js',
    'images/icon.jpg',
    'css/style.css',
    'images/icon.jpg/icon-128x128.png',
    'images/icon.jpg/icon-192x192.png'
]
self.addEventListener('intsall', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Кэширование ресурсов')
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})