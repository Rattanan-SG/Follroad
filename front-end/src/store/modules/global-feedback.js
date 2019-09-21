const state = {
  loginDialog: false,
  confirmDialog: false,
  confirmDialogOption: {
    id: null,
    text: "Message",
    submitActions: null
  },
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
  confirmDialog: state => {
    return state.confirmDialog;
  },
  confirmDialogOption: state => {
    return state.confirmDialogOption;
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
  openConfirmDialog: ({ commit }, confirmDialogOption) => {
    if (confirmDialogOption)
      commit("SET_CONFIRM_DIALOG_OPTION", confirmDialogOption);
    commit("SET_CONFIRM_DIALOG", true);
  },
  openMessageSnackbar: ({ commit }, messageSnackbarOption) => {
    if (messageSnackbarOption)
      commit("SET_MESSAGE_SNACKBAR_OPTION", messageSnackbarOption);
    commit("SET_MESSAGE_SNACKBAR", true);
  }
};

const mutations = {
  SET_LOGIN_DIALOG: (state, loginDialog) => {
    state.loginDialog = !!loginDialog;
  },
  SET_CONFIRM_DIALOG: (state, confirmDialog) => {
    state.confirmDialog = !!confirmDialog;
  },
  SET_CONFIRM_DIALOG_OPTION: (state, newOption) => {
    const { confirmDialogOption } = state;
    state.confirmDialogOption = { ...confirmDialogOption, ...newOption };
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
