const state = {
  searchPlace: null
};

const getters = {
  searchPlace: state => {
    return state.searchPlace;
  },
  searchPlaceMarker: state => {
    const { searchPlace } = state;
    if (searchPlace) {
      const photos = searchPlace.photos ? searchPlace.photos[0].getUrl() : null;
      return {
        id: searchPlace.id,
        position: searchPlace.geometry.location,
        title: searchPlace.name,
        description: searchPlace.formatted_address,
        photos: photos,
        type: "searchPlace"
      };
    }
  }
};

const actions = {
  setSearchPlace: ({ commit, dispatch }, searchPlace) => {
    commit("SET_SEARCH_PLACE", searchPlace);
    if (searchPlace) {
      dispatch("googleMap/setZoomLevel", 17, { root: true });
      dispatch("googleMap/setCenter", searchPlace.geometry.location, {
        root: true
      });
    }
  }
};

const mutations = {
  SET_SEARCH_PLACE: (state, searchPlace) => {
    state.searchPlace = searchPlace;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
