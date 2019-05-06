const state = {
  direction: null,
  routeIndex: 0,
  routePolyline: null,
  specificEvents: null,
  showSpecificEvents: false
};

const getters = {
  direction: state => {
    return state.direction;
  },
  routeIndex: state => {
    return state.routeIndex;
  },
  routePolyline: state => {
    return state.routePolyline;
  },
  specificEvents: state => {
    return state.specificEvents;
  },
  showSpecificEvents: state => {
    return state.showSpecificEvents;
  }
};

const actions = {
  setDirection: ({ commit }, direction) => {
    commit("SET_DIRECTION", direction);
  },
  setRouteIndex: ({ commit }, routeIndex) => {
    commit("SET_ROUTEINDEX", routeIndex);
  },
  setRoutePolyline: ({ commit }, routePolyline) => {
    commit("SET_ROUTEPOLYLINE", routePolyline);
  },
  setSpecificEvents: ({ commit, state, rootState }) => {
    let specificEvents;
    specificEvents = rootState.event.events.filter(event => {
      let latLng = new rootState.googleMap.googleClass.maps.LatLng({
        lat: event.latitude,
        lng: event.longitude
      });
      return rootState.googleMap.googleClass.maps.geometry.poly.isLocationOnEdge(
        latLng,
        state.routePolyline,
        0.001
      );
    });
    commit("SET_SPECIFICEVENTS", specificEvents);
  },
  setShowSpecificEvents: ({ commit }, showSpecificEvents) => {
    commit("SET_SHOWSPECIFICEVENTS", !!showSpecificEvents);
  }
};

const mutations = {
  SET_DIRECTION: (state, direction) => {
    state.direction = direction;
  },
  SET_ROUTEINDEX: (state, routeIndex) => {
    state.routeIndex = routeIndex;
  },
  SET_ROUTEPOLYLINE: (state, routePolyline) => {
    state.routePolyline = routePolyline;
  },
  SET_SPECIFICEVENTS: (state, specificEvents) => {
    state.specificEvents = specificEvents;
  },
  SET_SHOWSPECIFICEVENTS: (state, showSpecificEvents) => {
    state.direction = showSpecificEvents;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
