const state = {
  showRouterView: false
};

const getters = {
  showRouterView: state => {
    return state.showRouterView;
  }
};

const actions = {
  setShowRouterView: ({ commit }, showRouterView) => {
    commit("SET_SHOWROUTERVIEW", showRouterView);
  }
};

const mutations = {
  SET_SHOWROUTERVIEW: (state, showRouterView) => {
    state.showRouterView = !!showRouterView;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
