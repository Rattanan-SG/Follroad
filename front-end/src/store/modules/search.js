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
        }
      };
    }
  }
};

const actions = {
  setSearchPlace: ({ commit }, searchPlace) => {
    commit("SET_SEARCHPLACE", searchPlace);
  }
};

const mutations = {
  SET_SEARCHPLACE: (state, searchPlace) => {
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
