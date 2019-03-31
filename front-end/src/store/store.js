import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  myLocation: {},
};

const getters = {
  getCenter(state) {
    return state.center;
  },
  getMyLocation(state) {
    return state.myLocation;
  }
};

const actions = {
  setCenter({ commit }, center) {
    commit("SET_CENTER", center);
  },
  setMyLocation({ commit }, myLocation) {
    commit("SET_MYLOCATION", myLocation);
  }
};

const mutations = {
  SET_CENTER(state, center) {
    state.center = center;
  },
  SET_MYLOCATION(state, myLocation) {
    state.myLocation = myLocation;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
