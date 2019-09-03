const state = {
  direction: null,
  directionsRenderer: null,
  routeIndex: 0,
  routePolyline: null,
  specificEvents: null
};

const getters = {
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
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  setDirectionsRenderer: ({ commit }, directionsRenderer) => {
    commit("SET_DIRECTIONRENDERER", directionsRenderer);
  },
  selectRoute: ({ commit, rootState, dispatch }, { response, index }) => {
    return new Promise(resolve => {
      let routePolyline = new rootState.googleMap.googleClass.maps.Polyline({
        path: response.routes[index].overview_path
      });
      commit("SET_ROUTEINDEX", index);
      commit("SET_ROUTEPOLYLINE", routePolyline);
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
        commit("SET_SPECIFICEVENTS", result);
        resolve();
      }
    });
  }
};

const mutations = {
  SET_DIRECTION: (state, direction) => {
    state.direction = direction;
  },
  SET_DIRECTIONRENDERER: (state, directionsRenderer) => {
    state.directionsRenderer = directionsRenderer;
  },
  SET_ROUTEINDEX: (state, routeIndex) => {
    state.routeIndex = routeIndex;
  },
  SET_ROUTEPOLYLINE: (state, routePolyline) => {
    state.routePolyline = routePolyline;
  },
  SET_SPECIFICEVENTS: (state, specificEvents) => {
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
