import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  myLocation: null,
  searchPlace: null
};

const getters = {
  getCenter(state) {
    return state.center;
  },
  getMyLocation(state) {
    return state.myLocation;
  },
  getSearchPlace(state) {
    return state.searchPlace;
  }
};

const actions = {
  setCenter({ commit }, center) {
    commit("SET_CENTER", center);
  },
  setMyLocation({ commit }, myLocation) {
    commit("SET_MYLOCATION", myLocation);
  },
  setSearchPlace({ commit }, searchPlace) {
    commit("SET_SEARCHPLACE", searchPlace);
  }
};

const mutations = {
  SET_CENTER(state, center) {
    state.center = center;
  },
  SET_MYLOCATION(state, myLocation) {
    state.myLocation = myLocation;
  },
  SET_SEARCHPLACE(state, searchPlace) {
    state.searchPlace = searchPlace;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
