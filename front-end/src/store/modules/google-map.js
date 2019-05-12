const state = {
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  zoomLevel: 15,
  myLocation: null,
  googleClass: null,
  showRouterView: false,
  searchPlace: null
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
  },
  showRouterView: state => {
    return state.showRouterView;
  },
  searchPlace: state => {
    return state.searchPlace;
  },
  searchPlaceMarker: state => {
    if (state.searchPlace) {
      return {
        id: state.searchPlace.id,
        position: state.searchPlace.geometry.location,
        title: state.searchPlace.name,
        description: state.searchPlace.formatted_address,
        searchPlaceCaption: {
          photo: state.searchPlace.photos[0].getUrl()
        }
      };
    }
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
  },
  setShowRouterView: ({ commit }, showRouterView) => {
    commit("SET_SHOWROUTERVIEW", showRouterView);
  },
  setSearchPlace: ({ commit }, searchPlace) => {
    commit("SET_SEARCHPLACE", searchPlace);
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
  },
  SET_SHOWROUTERVIEW: (state, showRouterView) => {
    state.showRouterView = !!showRouterView;
  },
  SET_SEARCHPLACE: (state, searchPlace) => {
    state.searchPlace = searchPlace;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
