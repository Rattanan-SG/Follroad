const state = {
  loginDialog: false
};

const getters = {
  loginDialog: state => {
    return state.loginDialog;
  }
};

const actions = {
  setLoginDialog: ({ commit }, loginDialog) => {
    commit("SET_LOGIN_DIALOG", loginDialog);
  }
};

const mutations = {
  SET_LOGIN_DIALOG: (state, loginDialog) => {
    state.loginDialog = !!loginDialog;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
