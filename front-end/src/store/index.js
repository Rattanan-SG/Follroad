import Vue from "vue";
import Vuex from "vuex";
import event from "./modules/event";
import route from "./modules/route";
import googleMap from "./modules/google-map";
import infoWindow from "./modules/info-window";
import search from "./modules/search";
import direction from "./modules/direction";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    event,
    route,
    search,
    googleMap,
    infoWindow,
    direction
  }
});
