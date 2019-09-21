import directionRecord from "@/api/direction-record";
const state = {
  directionRecords: [],
  historyMode: null
};

const getters = {
  directionRecords: state => {
    return state.directionRecords;
  },
  directionRecordById: state => id => {
    return state.directionRecords.find(record => record._id == id);
  },
  historyMode: state => {
    return state.historyMode;
  }
};

const actions = {
  fetchDirectionRecordsByUid: ({ commit }, uid) => {
    return directionRecord
      .getRecords({ uid })
      .then(data => commit("SET_DIRECTION_RECORDS", data));
  },
  updateDirectionRecordById: ({ commit }, { _id, data }) => {
    return directionRecord
      .patchRecordById(_id, data)
      .then(data => commit("UPDATE_DIRECTION_RECORD_BY_ID", data));
  },
  deleteDirectionRecordById: ({ commit }, _id) => {
    return directionRecord
      .deleteRecordById(_id)
      .then(({ _id }) => commit("DELETE_DIRECTION_RECORD_BY_ID", _id));
  },
  setHistoryMode: ({ commit }, historyMode) => {
    commit("SET_HISTORY_MODE", historyMode);
  }
};

const mutations = {
  SET_DIRECTION_RECORDS: (state, directionRecords) => {
    state.directionRecords = directionRecords;
  },
  UPDATE_DIRECTION_RECORD_BY_ID: (state, { _id, data }) => {
    const index = state.directionRecords.findIndex(
      record => record._id === _id
    );
    const newRecord = { ...state.directionRecords[index], ...data };
    state.directionRecords[index] = newRecord;
  },
  DELETE_DIRECTION_RECORD_BY_ID: (state, _id) => {
    const index = state.directionRecords.findIndex(
      record => record._id === _id
    );
    state.directionRecords.splice(index, 1);
  },
  SET_HISTORY_MODE: (state, historyMode) => {
    state.historyMode = historyMode;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
