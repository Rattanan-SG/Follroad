import directionRecord from "@/api/direction-record";
const state = {
  directionRecords: []
};

const getters = {
  directionRecords: state => {
    return state.directionRecords;
  },
  directionRecordById: state => id => {
    return state.directionRecords.find(record => record._id == id);
  }
};

const actions = {
  fetchDirectionRecordsByUid: ({ commit }, uid) => {
    directionRecord
      .getRecords({ uid })
      .then(data => {
        commit("SET_DIRECTION_RECORDS", data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};

const mutations = {
  SET_DIRECTION_RECORDS: (state, directionRecords) => {
    state.directionRecords = directionRecords;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
