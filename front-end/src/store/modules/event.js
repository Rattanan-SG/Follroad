import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";

const state = {
  events: [],
  eventCategorySelected: eventConstant.EVENT_CATEGORY
};

const getters = {
  events: state => {
    if (
      state.eventCategorySelected.length != eventConstant.EVENT_CATEGORY.length
    ) {
      return state.events.filter(event =>
        state.eventCategorySelected.includes(event.icon)
      );
    } else {
      return state.events;
    }
  },
  eventById: state => id => {
    return state.events.find(event => event.id == id);
  },
  eventMarkers: (state, getters) => {
    return getters.events.map(event => ({
      id: event.id,
      position: {
        lat: event.latitude,
        lng: event.longitude
      },
      title: event.title,
      description: event.description,
      startTime: event.start,
      stopTime: event.stop,
      contributor: event.contributor,
      feedbacks: event.feedbacks,
      icon: eventConstant.selectIcon(event),
      type: "event"
    }));
  },
  eventMarkerByEventId: (state, getters) => id => {
    return getters.eventMarkers.find(marker => marker.id == id);
  },
  pagingEvents: (state, getters) => (pageSize, pageNumber) => {
    return getters.events.slice(
      pageNumber * pageSize,
      (pageNumber + 1) * pageSize
    );
  },
  eventCategorySelected: state => {
    return state.eventCategorySelected;
  }
};

const actions = {
  fetchEvents: ({ commit }) => {
    return eventApi
      .getEvents({
        fields:
          "id title description latitude longitude start stop contributor type",
        countFeedback: true
      })
      .then(data => commit("SET_EVENTS", data));
  },
  updateEventById: ({ commit }, { id, data }) => {
    commit("UPDATE_EVENT_BY_ID", { id, data });
  },
  socket_event: ({ dispatch, commit }, data) => {
    const { action, event } = data;
    if (action === "create") {
      commit("ADD_NEW_EVENT", event);
      dispatch(
        "globalFeedback/openMessageSnackbar",
        { text: `เกิดเหตุการณ์ ${event.title}`, color: "success" },
        { root: true }
      );
    } else if (action === "sync") {
      dispatch("fetchEvents");
      dispatch(
        "globalFeedback/openMessageSnackbar",
        { text: `อัปเดตเหตุการณ์ใหม่จาก ITIC ${event} จุด`, color: "success" },
        { root: true }
      );
    }
  }
};

const mutations = {
  SET_EVENTS: (state, events) => {
    state.events = events;
  },
  ADD_NEW_EVENT: (state, newEvent) => {
    state.events.unshift(newEvent);
  },
  UPDATE_EVENT_BY_ID: (state, { id, data }) => {
    const index = state.events.findIndex(event => event.id == id);
    const newEvent = { ...state.events[index], ...data };
    state.events[index] = newEvent;
  },
  SET_EVENT_CATEGORY_SELECTED: (state, eventCategorySelected) => {
    state.eventCategorySelected = eventCategorySelected;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
