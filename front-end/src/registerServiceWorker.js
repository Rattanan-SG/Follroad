/* eslint-disable no-console */
import { register } from 'register-service-worker'
import alertify from "alertifyjs"

// const notifyUserAboutUpdate = worker => {
//   alertify.confirm("new content!", () => {
//     alertify.success('Ok')
//     worker.postMessage({action: 'skipWaiting'})
//   })
// };

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      // notifyUserAboutUpdate(registration.waiting)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })

  // var refreshing;
  // navigator.serviceWorker.addEventListener("controllerchange", function (event) {
  //   console.log(
  //     '[controllerchange] A "controllerchange" event has happened ' +
  //     'within navigator.serviceWorker: ', event
  //   )
  //   if (refreshing) return;
  //   window.location.reload();
  //   refreshing = true;
  // });
}
