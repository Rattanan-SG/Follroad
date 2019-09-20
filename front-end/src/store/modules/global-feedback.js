const state = {
  loginDialog: false,
  messageSnackbar: false,
  messageSnackbarOption: {
    color: "success",
    timeout: 8000,
    text: "Message"
  }
};

const getters = {
  loginDialog: state => {
    return state.loginDialog;
  },
  messageSnackbar: state => {
    return state.messageSnackbar;
  },
  messageSnackbarOption: state => {
    return state.messageSnackbarOption;
  }
};

const actions = {
  setLoginDialog: ({ commit }, loginDialog) => {
    commit("SET_LOGIN_DIALOG", loginDialog);
  },
  setMessageSnackbar: ({ commit }, messageSnackbar) => {
    commit("SET_MESSAGE_SNACKBAR", messageSnackbar);
  },
  setMessageSnackbarOption: ({ commit }, newOption) => {
    commit("SET_MESSAGE_SNACKBAR_OPTION", newOption);
    commit("SET_MESSAGE_SNACKBAR", true);
  }
};

const mutations = {
  SET_LOGIN_DIALOG: (state, loginDialog) => {
    state.loginDialog = !!loginDialog;
  },
  SET_MESSAGE_SNACKBAR: (state, messageSnackbar) => {
    state.messageSnackbar = !!messageSnackbar;
  },
  SET_MESSAGE_SNACKBAR_OPTION: (state, newOption) => {
    const { messageSnackbarOption } = state;
    state.messageSnackbarOption = { ...messageSnackbarOption, ...newOption };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
