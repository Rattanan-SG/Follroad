import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";
import VueLuxon from "vue-luxon";
import AuthPlugin from "./plugins/auth";
import * as VueGoogleMaps from "vue2-google-maps";
import "./plugins/vuetify";
import "./registerServiceWorker";
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;

const socket = io(process.env.VUE_APP_SOCKET_URL);
Vue.use(AuthPlugin);
Vue.use(VueLazyload);
Vue.use(VueSocketIOExt, socket, {
  store
});
Vue.use(VueLuxon, {
  clientZone: "Asia/Bangkok",
  localeLang: "th"
});
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
    startDirections: function (startLocation, stopLocation) {
      this.$emit("startDirections", {
        startLocation,
        stopLocation
      });
    },
    stopDirections: function () {
      this.$emit("stopDirections");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");