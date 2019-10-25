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
        title: postEventLocation.title,
        icon:
          "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/report.png",
        type: "postEvent"
      };
    } else return null;
  }
};

const actions = {
  setActivePostEvent: ({ commit }, activePostEvent) => {
    commit("SET_ACTIVE_POST_EVENT", activePostEvent);
  },
  setPostEventLocation: ({ commit }, postEventLocation) => {
    commit("SET_POST_EVENT_LOCATION", postEventLocation);
  },
  completePostEvent: ({ commit }) => {
    commit("SET_ACTIVE_POST_EVENT", false);
    commit("SET_POST_EVENT_LOCATION", null);
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
