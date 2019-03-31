import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    center: {
      lat: 13.7563,
      lng: 100.5018
    },
    myLocation: {}
  },
  mutations: {
    SET_CENTER(state, center) {
      state.center = center;
    },
    SET_MYLOCATION(state, myLocation) {
      state.myLocation = myLocation;
    }
  },
  actions: {
    setCenter({ commit }, center) {
      commit("SET_CENTER", center);
    },
    setMyLocation({ commit }, myLocation) {
      commit("SET_MYLOCATION", myLocation);
    }
  },
  getters: {
    getCenter(state) {
      return state.center;
    },
    getMyLocation(state) {
      return state.myLocation;
    }
  }
});
