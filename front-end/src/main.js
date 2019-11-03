import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "./auth";
import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";
import VueLuxon from "vue-luxon";
import * as VueGoogleMaps from "vue2-google-maps";
import "./plugins/vuetify";
import "./registerServiceWorker";

const socket = io(process.env.VUE_APP_SOCKET_URL);

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(VueSocketIOExt, socket, { store });
Vue.use(VueLuxon, { clientZone: "Asia/Bangkok", localeLang: "th" });
Vue.use(VueGoogleMaps, {
  load: {
    libraries: "places,geometry,directions",
    key: process.env.VUE_APP_GOOGLE_KEY,
    region: "TH",
    language: "th"
  }
});

export const eventBus = new Vue({
  methods: {
    startDirections: function(startLocation, stopLocation) {
      this.$emit("startDirections", {
        startLocation,
        stopLocation
      });
    },
    stopDirections: function() {
      this.$emit("stopDirections");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
