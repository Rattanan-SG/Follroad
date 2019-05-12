workbox.core.setCacheNameDetails({ prefix: "follroad" });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.clientsClaim();

self.addEventListener("push", event => {
  console.log("[Service Worker] Push Received.");
  const title = "Push Codelab";
  const options = {
    body: "Yay it works. : " + event.data.text(),
    icon: "img/icons/favicon-32x32.png",
    badge: "img/icons/favicon-32x32.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("message", event => {
  if (!event.data) {
    return;
  }
  switch (event.data) {
    case "skipWaiting":
      self.skipWaiting();
      break;
    default:
      break;
  }
});
