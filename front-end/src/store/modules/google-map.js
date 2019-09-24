const state = {
  mapObject: null,
  googleClass: null,
  center: {
    lat: 13.7563,
    lng: 100.5018
  },
  zoomLevel: 15,
  myLocation: null,
  watchId: null
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
  },
  watchId: state => {
    return state.watchId;
  }
};

const actions = {
  setMapObject: ({ commit }, mapObject) => {
    commit("SET_MAP_OBJECT", mapObject);
  },
  setGoogleClass: ({ commit }, googleClass) => {
    commit("SET_GOOGLE_CLASS", googleClass);
  },
  setCenter: ({ state, commit }, center) => {
    if (state.mapObject) {
      state.mapObject.panTo(center);
    }
    commit("SET_CENTER", center);
  },
  setZoomLevel: ({ state, commit }, zoomLevel) => {
    if (state.mapObject) {
      state.mapObject.setZoom(zoomLevel);
    }
    commit("SET_ZOOM_LEVEL", zoomLevel);
  },
  setMyLocation: ({ commit, dispatch }) => {
    if (navigator.geolocation) {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          async position => {
            let lat = parseFloat(position.coords.latitude);
            let lng = parseFloat(position.coords.longitude);
            dispatch("setCenter", { lat: lat, lng: lng });
            commit("SET_MY_LOCATION", {
              name: "ตำแหน่งปัจจุบัน",
              location: { lat: lat, lng: lng }
            });
            resolve();
          },
          async error => {
            // console.log(error);
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
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        dispatch("startWatchMyLocation");
      });
    }
  },
  startWatchMyLocation: ({ commit }) => {
    if (navigator.geolocation) {
      return new Promise(resolve => {
        const watchId = navigator.geolocation.watchPosition(
          async position => {
            let lat = parseFloat(position.coords.latitude);
            let lng = parseFloat(position.coords.longitude);
            commit("SET_MY_LOCATION", {
              name: "ตำแหน่งปัจจุบัน",
              location: { lat: lat, lng: lng }
            });
            resolve();
          },
          error => {
            console.warn("ERROR(" + error.code + "): " + error.message);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        commit("SET_WATCH_ID", watchId);
      });
    }
  },
  stopWatchMyLocation: ({ state, commit }) => {
    if (state.watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(state.watchId);
      commit("SET_WATCH_ID", null);
    }
  },
  resetCenterToMyLocation: async ({ state, dispatch }) => {
    if (!state.myLocation) {
      await dispatch("setMyLocation");
    } else if (state.myLocation) {
      dispatch("setZoomLevel", 15);
      dispatch("setCenter", state.myLocation.location);
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
  },
  SET_WATCH_ID: (state, watchId) => {
    state.watchId = watchId;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
