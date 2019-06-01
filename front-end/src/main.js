import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import AuthPlugin from "./plugins/auth";
import * as VueGoogleMaps from "vue2-google-maps";
import "./plugins/vuetify";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(AuthPlugin);
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
      this.$emit("startDirections", { startLocation, stopLocation });
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
