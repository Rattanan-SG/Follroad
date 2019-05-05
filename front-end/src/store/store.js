import Vue from "vue";
import Vuex from "vuex";
import googleMap from "./modules/google-map";
import event from "./modules/event";
import direction from "./modules/direction";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    googleMap,
    event,
    direction
  }
});
