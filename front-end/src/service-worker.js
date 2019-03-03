workbox.core.setCacheNameDetails({prefix: "follroad"});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('push', event => {
    console.log('[Service Worker] Push Received.');
    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works. : '+ event.data.text(),
      icon: 'img/icons/favicon-32x32.png',
      badge: 'img/icons/favicon-32x32.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
});

// self.addEventListener("message", msg => {
//     if(msg.data.action == 'skipWaiting'){
//         self.skipWaiting()
//     }
// })

