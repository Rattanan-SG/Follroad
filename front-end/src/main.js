import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./plugins/vuetify";
import "./registerServiceWorker";
import * as VueGoogleMaps from "vue2-google-maps";
import InfiniteLoading from "vue-infinite-loading";

Vue.config.productionTip = false;

Vue.use(InfiniteLoading);
Vue.use(VueGoogleMaps, {
  load: {
    libraries: "places,geometry,directions",
    key: process.env.VUE_APP_GOOGLE_KEY,
    region: "TH",
    language: "th"
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
