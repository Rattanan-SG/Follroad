import Vue from "vue";
import Vuex from "vuex";
import eventService from "../utilitys/eventService";
import axios from "../utilitys/axios";

Vue.use(Vuex);

const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  myLocation: null,
  startPlace: null,
  searchPlace: null,
  direction: null,
  events: [],
  eventCategorySelected: eventService.EVENT_CATEGORY,
  showRouterView: false,
  infoWindow: {
    marker: null,
    infoWindowOpen: false,
    currentIndex: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    }
  }
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
    if (
      state.eventCategorySelected.length != eventService.EVENT_CATEGORY.length
    ) {
      return state.events.filter(event =>
        state.eventCategorySelected.includes(event.icon)
      );
    } else {
      return state.events;
    }
  },
  markers: (state, getters) => {
    return getters.events.map(event => {
      return {
        id: event.eid,
        position: {
          lat: event.latitude,
          lng: event.longitude
        },
        description: event.description,
        title: event.title,
        startTime: event.start,
        stopTime: event.stop,
        contributor: event.contributor,
        icon: eventService.selectIcon(event)
      };
    });
  },
  pagingEvents: (state, getters) => (pageSize, pageNumber) => {
    return eventService.eventPaginate(getters.events, pageSize, pageNumber);
  },
  eventCategorySelected: state => {
    return state.eventCategorySelected;
  },
  showRouterView: state => {
    return state.showRouterView;
  },
  infoWindow: state => {
    return state.infoWindow;
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
  },
  setInfoWindow: ({ commit }, marker) => {
    commit("SET_INFOWINDOW", marker);
  },
  closeInfoWindow: ({ commit }) => {
    commit("CLOSE_INFOWINDOW");
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
  },
  SET_INFOWINDOW: (state, marker) => {
    state.infoWindow.marker = marker;
    if (state.infoWindow.currentIndex == marker.id) {
      state.infoWindow.infoWindowOpen = !state.infoWindow.infoWindowOpen;
    } else {
      state.infoWindow.infoWindowOpen = true;
      state.infoWindow.currentIndex = marker.id;
    }
  },
  CLOSE_INFOWINDOW: state => {
    state.infoWindow.infoWindowOpen = false;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
