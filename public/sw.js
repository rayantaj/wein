// Network first, every good response is cached, the cache answers when offline.
// shortcut: nothing is cached before the first visit finishes loading, and old files are never pruned; upgrade to a build-time file list if that bites.
const CACHE = 'wein-v1'

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/wein/', '/wein/manifest.webmanifest'])))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(e.request, copy))
        }
        return res
      })
      .catch(() => caches.match(e.request).then((hit) => hit ?? (e.request.mode === 'navigate' ? caches.match('/wein/') : Response.error()))),
  )
})
