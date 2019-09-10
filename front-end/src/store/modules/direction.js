const state = {
  startLocation: null,
  destinationLocation: null,
  directionsResponse: null,
  directionsRenderer: null,
  routeIndex: 0,
  routePolyline: null,
  specificEvents: null
};

const getters = {
  startLocation: state => {
    return state.startLocation;
  },
  destinationLocation: state => {
    return state.destinationLocation;
  },
  directionsResponse: state => {
    return state.directionsResponse;
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
  setDestinationLocation: ({ commit }, destinationLocation) => {
    commit("SET_DESTINATION_LOCATION", destinationLocation);
  },
  setDirectionsResponse: ({ commit }, directionsResponse) => {
    commit("SET_DIRECTIONS_RESPONSE", directionsResponse);
  },
  setDirectionsRenderer: ({ commit }, directionsRenderer) => {
    commit("SET_DIRECTIONS_RENDERER", directionsRenderer);
  },
  selectRoute: ({ commit, state, rootState, dispatch }, routeIndex) => {
    return new Promise(resolve => {
      const routePolyline = new rootState.googleMap.googleClass.maps.Polyline({
        path: state.directionsResponse.routes[routeIndex].overview_path
      });
      commit("SET_ROUTE_INDEX", routeIndex);
      dispatch("specificEvents", routePolyline).then(resolve());
    });
  },
  specificEvents: ({ commit, rootState }, routePolyline) => {
    return new Promise(resolve => {
      if (routePolyline) {
        let result = rootState.event.events.filter(event => {
          let latLng = new rootState.googleMap.googleClass.maps.LatLng({
            lat: event.latitude,
            lng: event.longitude
          });
          return rootState.googleMap.googleClass.maps.geometry.poly.isLocationOnEdge(
            latLng,
            routePolyline,
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
  SET_DESTINATION_LOCATION: (state, destinationLocation) => {
    state.destinationLocation = destinationLocation;
  },
  SET_DIRECTIONS_RESPONSE: (state, directionsResponse) => {
    state.directionsResponse = directionsResponse;
  },
  SET_DIRECTIONS_RENDERER: (state, directionsRenderer) => {
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
