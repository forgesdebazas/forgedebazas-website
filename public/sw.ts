self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open("my-cache").then((cache: Cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/offline.html",
      ]);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response: Response | undefined) => {
      return response ?? fetch(event.request);
    })
  );
});
