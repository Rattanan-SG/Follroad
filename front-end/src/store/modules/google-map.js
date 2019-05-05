const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  zoomLevel: 15,
  myLocation: null,
  googleClass: null
};

const getters = {
  center: state => {
    return state.center;
  },
  zoomLevel: state => {
    return state.zoomLevel;
  },
  myLocation: state => {
    return state.myLocation;
  },
  googleClass: state => {
    return state.googleClass;
  }
};

const actions = {
  setCenter: ({ commit }, center) => {
    commit("SET_CENTER", center);
  },
  setZoomLevel: ({ commit }, zoomLevel) => {
    commit("SET_ZOOMLEVEL", zoomLevel);
  },
  setMyLocation: ({ commit }, myLocation) => {
    commit("SET_MYLOCATION", myLocation);
  },
  setGoogleClass: ({ commit }, googleClass) => {
    commit("SET_GOOGLECLASS", googleClass);
  }
};

const mutations = {
  SET_CENTER: (state, center) => {
    state.center = center;
  },
  SET_ZOOMLEVEL: (state, zoomLevel) => {
    state.zoomLevel = zoomLevel;
  },
  SET_MYLOCATION: (state, myLocation) => {
    state.myLocation = myLocation;
  },
  SET_GOOGLECLASS: (state, googleClass) => {
    state.googleClass = googleClass;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
