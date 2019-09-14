const state = {
  activePostEvent: false,
  postEventLocation: null
};

const getters = {
  activePostEvent: state => {
    return state.activePostEvent;
  },
  postEventMarker: state => {
    const { postEventLocation } = state;
    if (postEventLocation) {
      return {
        id: JSON.stringify(postEventLocation.location.lat),
        position: postEventLocation.location,
        title: postEventLocation.name,
        type: "postEvent"
      };
    }
  }
};

const actions = {
  setActivePostEvent: ({ commit }, activePostEvent) => {
    commit("SET_ACTIVE_POST_EVENT", activePostEvent);
  },
  setPostEventLocation: ({ commit }, postEventLocation) => {
    commit("SET_POST_EVENT_LOCATION", postEventLocation);
  }
};

const mutations = {
  SET_ACTIVE_POST_EVENT: (state, activePostEvent) => {
    state.activePostEvent = activePostEvent;
  },
  SET_POST_EVENT_LOCATION: (state, postEventLocation) => {
    state.postEventLocation = postEventLocation;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
