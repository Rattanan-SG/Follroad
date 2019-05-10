const state = {
  direction: null,
  directionsRenderer: null,
  routeIndex: 0,
  routePolyline: null
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
  specificEvents: (state, rootState) => {
    if (state.routePolyline) {
      return rootState.events.filter(event => {
        let latLng = new rootState.googleClass.maps.LatLng({
          lat: event.latitude,
          lng: event.longitude
        });
        return rootState.googleClass.maps.geometry.poly.isLocationOnEdge(
          latLng,
          state.routePolyline,
          0.001
        );
      });
    }
  }
};

const actions = {
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  setDirectionsRenderer: ({ commit }, directionsRenderer) => {
    commit("SET_DIRECTIONRENDERER", directionsRenderer);
  },
  selectRoute: ({ commit, rootState }, { response, index }) => {
    return new Promise(resolve => {
      let routePolyline = new rootState.googleMap.googleClass.maps.Polyline({
        path: response.routes[index].overview_path
      });
      commit("SET_ROUTEINDEX", index);
      commit("SET_ROUTEPOLYLINE", routePolyline);
      resolve();
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
