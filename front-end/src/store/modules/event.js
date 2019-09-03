import event from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";

const state = {
  events: [],
  eventCategorySelected: eventConstant.EVENT_CATEGORY,
  infoWindow: {
    marker: null,
    infoWindowOpen: false,
    currentIndex: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    }
  }
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
  markers: (state, getters) => {
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
      icon: eventConstant.selectIcon(event)
    }));
  },
  markerByEventId: (state, getters) => id => {
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
  },
  infoWindow: state => {
    return state.infoWindow;
  }
};

const actions = {
  fetchEvents: ({ commit }) => {
    event.getEvents().then(data => {
      commit("SET_EVENTS", data);
    });
  },
  setInfoWindow: ({ commit }, marker) => {
    commit("SET_INFOWINDOW", marker);
  },
  closeInfoWindow: ({ commit }) => {
    commit("CLOSE_INFOWINDOW");
  }
};

const mutations = {
  SET_EVENTS: (state, events) => {
    state.events = events;
  },
  SET_EVENT_CATEGORY_SELECTED: (state, eventCategorySelected) => {
    state.eventCategorySelected = eventCategorySelected;
  },
  SET_INFOWINDOW: (state, marker) => {
    state.infoWindow.marker = marker;
    if (state.infoWindow.currentIndex == marker.id) {
      state.infoWindow.infoWindowOpen = !state.infoWindow.infoWindowOpen;
    } else {
      state.infoWindow.infoWindowOpen = true;
      state.infoWindow.currentIndex = marker.id;
    }
  },
  CLOSE_INFOWINDOW: state => {
    state.infoWindow.infoWindowOpen = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
