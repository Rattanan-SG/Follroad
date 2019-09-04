const state = {
  googleClass: null,
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  zoomLevel: 15,
  myLocation: null
};

const getters = {
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
  setGoogleClass: ({ commit }, googleClass) => {
    commit("SET_GOOGLECLASS", googleClass);
  },
  setCenter: ({ commit }, center) => {
    commit("SET_CENTER", center);
  },
  setZoomLevel: ({ commit }, zoomLevel) => {
    commit("SET_ZOOMLEVEL", zoomLevel);
  },
  getMyLocation: ({ commit, dispatch }) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          let lat = parseFloat(position.coords.latitude);
          let lng = parseFloat(position.coords.longitude);
          await dispatch("setCenter", { lat: lat, lng: lng });
          commit("SET_MYLOCATION", {
            name: "ตำแหน่งปัจจุบัน",
            location: { lat: lat, lng: lng }
          });
        },
        async error => {
          console.log(error);
          switch (error.code) {
            case 3:
              // deal with timeout
              await dispatch("getMyLocation");
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
  }
};

const mutations = {
  SET_GOOGLECLASS: (state, googleClass) => {
    state.googleClass = googleClass;
  },
  SET_CENTER: (state, center) => {
    state.center = center;
  },
  SET_ZOOMLEVEL: (state, zoomLevel) => {
    state.zoomLevel = zoomLevel;
  },
  SET_MYLOCATION: (state, myLocation) => {
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
