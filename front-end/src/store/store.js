import Vue from "vue";
import Vuex from "vuex";
import axios from "../utilitys/axios";

Vue.use(Vuex);

const EVENTCATEGORY = [
  "brokencar",
  "construction",
  "accident",
  "rain",
  "flood",
  "demonstration",
  "information",
  "checkpoint",
  "trafficjam",
  "miscellaneous",
  "warning",
  "event",
  "sale",
  "fire"
];

const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  myLocation: null,
  startPlace: null,
  searchPlace: null,
  direction: null,
  events: null,
  eventCategorySelected: EVENTCATEGORY,
  showRouterView: false
};

const getters = {
  center: state => {
    return state.center;
  },
  myLocation: state => {
    return state.myLocation;
  },
  startPlace: state => {
    return state.startPlace;
  },
  searchPlace: state => {
    return state.searchPlace;
  },
  direction: state => {
    return state.direction;
  },
  events: state => {
    if (state.eventCategorySelected.length != EVENTCATEGORY.length) {
      return state.events.filter(event =>
        state.eventCategorySelected.includes(event.icon)
      );
    } else {
      return state.events;
    }
  },
  eventCategorySelected: state => {
    return state.eventCategorySelected;
  },
  showRouterView: state => {
    return state.showRouterView;
  }
};

const actions = {
  setCenter: ({ commit }, center) => {
    commit("SET_CENTER", center);
  },
  setMyLocation: ({ commit }, myLocation) => {
    commit("SET_MYLOCATION", myLocation);
  },
  setStartPlace: ({ commit }, startPlace) => {
    commit("SET_STARTPLACE", startPlace);
  },
  setSearchPlace: ({ commit }, searchPlace) => {
    commit("SET_SEARCHPLACE", searchPlace);
  },
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  fetchEvents: ({ commit }) => {
    axios.get("/events").then(response => {
      commit("SET_EVENTS", response.data);
    });
  },
  setShowRouterView: ({ commit }, showRouterView) => {
    commit("SET_SHOWROUTERVIEW", showRouterView);
  }
};

const mutations = {
  SET_CENTER: (state, center) => {
    state.center = center;
  },
  SET_MYLOCATION: (state, myLocation) => {
    state.myLocation = myLocation;
  },
  SET_STARTPLACE: (state, startPlace) => {
    state.startPlace = startPlace;
  },
  SET_SEARCHPLACE: (state, searchPlace) => {
    state.searchPlace = searchPlace;
  },
  SET_DIRECTION: (state, direction) => {
    state.direction = direction;
  },
  SET_EVENTS: (state, events) => {
    state.events = events;
  },
  SET_EVENTCATEGORYSELECTED: (state, eventCategorySelected) => {
    state.eventCategorySelected = eventCategorySelected;
  },
  SET_SHOWROUTERVIEW: (state, showRouterView) => {
    state.showRouterView = showRouterView;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
