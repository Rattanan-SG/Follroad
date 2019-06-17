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

self.addEventListener("notificationclick", event => {
  console.log("[Service Worker] Notification click Received.");
  event.notification.close();
  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});

self.addEventListener("pushsubscriptionchange", event => {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then(newSubscription => {
        // TODO: Send to application server
        console.log("[Service Worker] New subscription: ", newSubscription);
      })
  );
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
