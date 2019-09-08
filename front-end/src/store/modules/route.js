const state = {
  routerView: false,
  activeRoute: "/"
};

const getters = {
  routerView: state => {
    return state.routerView;
  },
  activeRoute: state => {
    return state.routerView;
  }
};

const actions = {
  setRouterView: ({ commit }, routerView) => {
    commit("SET_ROUTER_VIEW", routerView);
  },
  toggleRouterView: ({ commit, state }) => {
    commit("SET_ROUTER_VIEW", !state.routerView);
  }
};

const mutations = {
  SET_ROUTER_VIEW: (state, routerView) => {
    state.routerView = !!routerView;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
