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
    return getters.markers.find(marker => marker.id == id);
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
  }
};

const mutations = {
  SET_EVENTS: (state, events) => {
    state.events = events;
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
