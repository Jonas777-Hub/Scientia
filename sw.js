/* Offline-Cache für Scientia. Bei Änderungen VERSION erhöhen. */
const VERSION = "scientia-v3";
const FILES = [
  "./", "index.html", "css/style.css", "js/app.js", "js/data-countries.js", "js/data-quiz.js", "js/q/_gen.js", "js/q/allgemein.js", "js/q/allgemein2.js", "js/q/antike.js", "js/q/antike2.js", "js/q/antike3.js", "js/q/de-geschichte.js", "js/q/de-geschichte2.js", "js/q/de-geschichte3.js", "js/q/erdkunde.js", "js/q/kultur.js", "js/q/mittelalter.js", "js/q/mittelalter2.js", "js/q/mittelalter3.js", "js/q/natur.js", "js/q/natur2.js", "js/q/sport.js", "js/q/technik.js", "js/q/technik2.js", "js/q/technik3.js", "js/q/weltgeschichte.js", "js/q/weltgeschichte2.js", "js/q/weltgeschichte3.js", "js/q/weltkriege.js", "js/q/weltkriege2.js", "js/q/weltkriege3.js", "js/q/wissenschaft.js",
  "js/data-images.js", "data/world.js", "lib/d3.min.js", "lib/topojson-client.min.js", "lib/mqtt.min.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // Netzwerk zuerst (damit Updates ankommen), sonst Cache.
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
