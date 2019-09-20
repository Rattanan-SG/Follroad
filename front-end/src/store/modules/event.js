import event from "@/api/event";
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
  eventMarkers: (state, getters) => {
    return getters.events.map(event => ({
      id: event.id,
      position: {
        lat: event.latitude,
        lng: event.longitude
      },
      title: event.title,
      description: event.description,
      eventCaption: {
        startTime: event.start,
        stopTime: event.stop,
        contributor: event.contributor
      },
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
    event.getEvents().then(data => {
      commit("SET_EVENTS", data);
    });
  },
  socket_event: ({ dispatch, commit }, data) => {
    const { action, event } = data;
    if (action === "create") {
      commit("ADD_NEW_EVENT", event);
      dispatch(
        "globalFeedback/setMessageSnackbarOption",
        { text: `เกิดเหตุการณ์ ${event.title}`, color: "success" },
        { root: true }
      );
    } else if (action === "sync") {
      dispatch("fetchEvents");
      dispatch(
        "globalFeedback/setMessageSnackbarOption",
        { text: `มีเหตุการณ์ใหม่เกิดขึ้น ${event} จุด`, color: "success" },
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
