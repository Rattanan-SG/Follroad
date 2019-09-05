const state = {
  startLocation: null,
  direction: null,
  directionsRenderer: null,
  routeIndex: 0,
  routePolyline: null,
  specificEvents: null
};

const getters = {
  startLocation: state => {
    return state.startLocation;
  },
  direction: state => {
    return state.direction;
  },
  directionsRenderer: state => {
    return state.directionsRenderer;
  },
  routeIndex: state => {
    return state.routeIndex;
  },
  routePolyline: state => {
    return state.routePolyline;
  },
  specificEvents: state => {
    return state.specificEvents;
  }
};

const actions = {
  setStartLocation: ({ commit }, startLocation) => {
    commit("SET_START_LOCATION", startLocation);
  },
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  setDirectionsRenderer: ({ commit }, directionsRenderer) => {
    commit("SET_DIRECTION_RENDERER", directionsRenderer);
  },
  selectRoute: ({ commit, rootState, dispatch }, { response, index }) => {
    return new Promise(resolve => {
      let routePolyline = new rootState.googleMap.googleClass.maps.Polyline({
        path: response.routes[index].overview_path
      });
      commit("SET_ROUTE_INDEX", index);
      commit("SET_ROUTE_POLYLINE", routePolyline);
      dispatch("specificEvents").then(resolve());
    });
  },
  specificEvents: ({ commit, state, rootState }) => {
    return new Promise(resolve => {
      if (state.routePolyline) {
        let result = rootState.event.events.filter(event => {
          let latLng = new rootState.googleMap.googleClass.maps.LatLng({
            lat: event.latitude,
            lng: event.longitude
          });
          return rootState.googleMap.googleClass.maps.geometry.poly.isLocationOnEdge(
            latLng,
            state.routePolyline,
            0.002
          );
        });
        commit("SET_SPECIFIC_EVENTS", result);
        resolve();
      }
    });
  }
};

const mutations = {
  SET_START_LOCATION: (state, startLocation) => {
    state.startLocation = startLocation;
  },
  SET_DIRECTION: (state, direction) => {
    state.direction = direction;
  },
  SET_DIRECTION_RENDERER: (state, directionsRenderer) => {
    state.directionsRenderer = directionsRenderer;
  },
  SET_ROUTE_INDEX: (state, routeIndex) => {
    state.routeIndex = routeIndex;
  },
  SET_ROUTE_POLYLINE: (state, routePolyline) => {
    state.routePolyline = routePolyline;
  },
  SET_SPECIFIC_EVENTS: (state, specificEvents) => {
    state.specificEvents = specificEvents;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
