const state = {
  mapObject: null,
  googleClass: null,
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  zoomLevel: 15,
  myLocation: null
};

const getters = {
  mapObject: state => {
    return state.mapObject;
  },
  googleClass: state => {
    return state.googleClass;
  },
  center: state => {
    return state.center;
  },
  zoomLevel: state => {
    return state.zoomLevel;
  },
  myLocation: state => {
    return state.myLocation;
  }
};

const actions = {
  setMapObject: ({ commit }, mapObject) => {
    commit("SET_MAP_OBJECT", mapObject);
  },
  setGoogleClass: ({ commit }, googleClass) => {
    commit("SET_GOOGLE_CLASS", googleClass);
  },
  setCenter: ({ commit }, center) => {
    commit("SET_CENTER", center);
  },
  setZoomLevel: ({ commit }, zoomLevel) => {
    commit("SET_ZOOM_LEVEL", zoomLevel);
  },
  setMyLocation: ({ commit, dispatch }) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          let lat = parseFloat(position.coords.latitude);
          let lng = parseFloat(position.coords.longitude);
          await dispatch("setCenter", { lat: lat, lng: lng });
          commit("SET_MY_LOCATION", {
            name: "ตำแหน่งปัจจุบัน",
            location: { lat: lat, lng: lng }
          });
        },
        async error => {
          console.log(error);
          switch (error.code) {
            case 3:
              // deal with timeout
              await dispatch("setMyLocation");
              break;
            case 2:
              // device can't get data
              break;
            case 1:
            // user said no
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  },
  resetCenterToMyLocation: async ({ state, dispatch }) => {
    if (!state.myLocation) {
      await dispatch("setMyLocation");
    } else if (state.myLocation) {
      state.mapObject.setCenter(state.myLocation.location);
      state.mapObject.setZoom(15);
    }
  }
};

const mutations = {
  SET_MAP_OBJECT: (state, mapObject) => {
    state.mapObject = mapObject;
  },
  SET_GOOGLE_CLASS: (state, googleClass) => {
    state.googleClass = googleClass;
  },
  SET_CENTER: (state, center) => {
    state.center = center;
  },
  SET_ZOOM_LEVEL: (state, zoomLevel) => {
    state.zoomLevel = zoomLevel;
  },
  SET_MY_LOCATION: (state, myLocation) => {
    state.myLocation = myLocation;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
