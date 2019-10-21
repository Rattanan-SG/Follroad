import Vue from "vue";
import Vuex from "vuex";
import event from "./modules/event";
import feedback from "./modules/feedback";
import route from "./modules/route";
import googleMap from "./modules/google-map";
import infoWindow from "./modules/info-window";
import search from "./modules/search";
import direction from "./modules/direction";
import globalFeedback from "./modules/global-feedback";
import directionRecord from "./modules/direction-record";
import postEvent from "./modules/post-event";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    event,
    feedback,
    route,
    search,
    googleMap,
    infoWindow,
    direction,
    globalFeedback,
    directionRecord,
    postEvent
  }
});
