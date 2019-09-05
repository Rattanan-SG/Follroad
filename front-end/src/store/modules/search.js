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
      return {
        id: searchPlace.id,
        position: searchPlace.geometry.location,
        title: searchPlace.name,
        description: searchPlace.formatted_address,
        searchPlaceCaption: {
          photo: searchPlace.photos[0].getUrl()
        },
        type: "searchPlace"
      };
    }
  }
};

const actions = {
  setSearchPlace: ({ commit }, searchPlace) => {
    commit("SET_SEARCH_PLACE", searchPlace);
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
