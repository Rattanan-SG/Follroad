workbox.core.setCacheNameDetails({ prefix: "follroad" });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.clientsClaim();

self.addEventListener("push", event => {
  console.log("[Service Worker] Push Received.");
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: "img/icons/favicon-32x32.png",
    badge: "img/icons/favicon-32x32.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  console.log("[Service Worker] Notification click Received.");
  event.notification.close();
  event.waitUntil(clients.openWindow("https://follroad.netlify.com"));
});

self.addEventListener("pushsubscriptionchange", event => {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then(newSubscription => {
        console.log("[Service Worker] Renew subscription");
        return fetch(
          "https://follroad.tk/notification/api/subscription/renew",
          {
            method: "post",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              oldSubscription: event.oldSubscription,
              newSubscription: newSubscription
            })
          }
        );
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
