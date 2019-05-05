import Vue from "vue";
import Vuex from "vuex";
import eventService from "../utilitys/eventService";
import axios from "../utilitys/axios";
import googleMap from "./modules/google-map";
import event from "./modules/event";
import direction from "./modules/direction";

Vue.use(Vuex);

const state = {
  searchPlace: null,
  direction: null,
  showRouterView: false,
  routePolyline: null
};

const getters = {
  searchPlace: state => {
    return state.searchPlace;
  },
  direction: state => {
    return state.direction;
  },
  showRouterView: state => {
    return state.showRouterView;
  },
  test: state => {
    if (state.routePolyline) {
      return state.events.filter(event => {
        let latLng = new state.googleClass.maps.LatLng({
          lat: event.latitude,
          lng: event.longitude
        });

        return state.googleClass.maps.geometry.poly.isLocationOnEdge(
          latLng,
          state.routePolyline,
          0.001
        );
      });
    }
  }
};

const actions = {
  setSearchPlace: ({ commit }, searchPlace) => {
    commit("SET_SEARCHPLACE", searchPlace);
  },
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  setShowRouterView: ({ commit }, showRouterView) => {
    commit("SET_SHOWROUTERVIEW", showRouterView);
  },
  closeInfoWindow: ({ commit }) => {
    commit("CLOSE_INFOWINDOW");
  },
  setRoutePolyline: ({ commit }, routePolyline) => {
    commit("SET_ROUTEPOLYLINE", routePolyline);
  }
};

const mutations = {
  SET_SEARCHPLACE: (state, searchPlace) => {
    state.searchPlace = searchPlace;
  },
  SET_DIRECTION: (state, direction) => {
    state.direction = direction;
  },
  SET_SHOWROUTERVIEW: (state, showRouterView) => {
    state.showRouterView = !!showRouterView;
  },
  CLOSE_INFOWINDOW: state => {
    state.infoWindow.infoWindowOpen = false;
  },
  SET_ROUTEPOLYLINE: (state, routePolyline) => {
    state.routePolyline = routePolyline;
  }
};

export default new Vuex.Store({
  modules: {
    googleMap,
    event,
    direction
  }
});
