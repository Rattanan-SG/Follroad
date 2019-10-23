import Vue from "vue";
import eventApi from "@/api/event";

const state = {
  feedbacks: []
};

const getters = {
  feedbacks: state => {
    return state.feedbacks;
  },
  feedbackByEventId: state => eventId => {
    const result = state.feedbacks.find(
      feedback => feedback.eventId == eventId
    );
    if (!result) return { like: 0, dislike: 0, react: null };
    return result;
  }
};

const actions = {
  fetchFeedbackSummary: ({ commit }, uid) => {
    return eventApi
      .getFeedbackSummary({
        uid
      })
      .then(data => commit("SET_FEEDBACKS", data));
  },
  updateFeedbackByEventId: ({ commit }, { eventId, data }) => {
    commit("UPDATE_FEEDBACK_BY_EVENT_ID", { eventId, data });
  }
};

const mutations = {
  SET_FEEDBACKS: (state, feedbacks) => {
    state.feedbacks = feedbacks;
  },
  UPDATE_FEEDBACK_BY_EVENT_ID: (state, { eventId, data }) => {
    const index = state.feedbacks.findIndex(
      feedback => feedback.eventId == eventId
    );
    if (index === -1) {
      state.feedbacks.unshift(data);
    } else {
      const newFeedback = { ...state.feedbacks[index], ...data };
      Vue.set(state.feedbacks, index, newFeedback);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
