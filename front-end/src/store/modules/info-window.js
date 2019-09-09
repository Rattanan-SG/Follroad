const state = {
  infoWindow: {
    marker: null,
    infoWindowOpen: false,
    currentIndex: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    }
  }
};

const getters = {
  infoWindow: state => {
    return state.infoWindow;
  }
};

const actions = {
  setInfoWindow: ({ commit }, marker) => {
    commit("SET_INFO_WINDOW", marker);
  },
  closeInfoWindow: ({ commit }) => {
    commit("CLOSE_INFO_WINDOW");
  }
};

const mutations = {
  SET_INFO_WINDOW: (state, marker) => {
    state.infoWindow.marker = marker;
    if (state.infoWindow.currentIndex == marker.id) {
      state.infoWindow.infoWindowOpen = !state.infoWindow.infoWindowOpen;
    } else {
      state.infoWindow.infoWindowOpen = true;
      state.infoWindow.currentIndex = marker.id;
    }
  },
  CLOSE_INFO_WINDOW: state => {
    state.infoWindow.infoWindowOpen = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
