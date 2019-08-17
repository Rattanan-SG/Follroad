import axios from "axios";
import eventService from "@/utilitys/eventService";

const state = {
  events: [],
  eventCategorySelected: eventService.EVENT_CATEGORY,
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
      state.eventCategorySelected.length != eventService.EVENT_CATEGORY.length
    ) {
      return state.events.filter(event =>
        state.eventCategorySelected.includes(event.icon)
      );
    } else {
      return state.events;
    }
  },
  markers: (state, getters) => {
    return getters.events.map(event => {
      return {
        id: event.eid,
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
        icon: eventService.selectIcon(event)
      };
    });
  },
  markerByEventId: (state, getters) => eid => {
    return getters.markers.find(marker => marker.id == eid);
  },
  pagingEvents: (state, getters) => (pageSize, pageNumber) => {
    return eventService.eventPaginate(getters.events, pageSize, pageNumber);
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
    axios
      .get(`${process.env.VUE_APP_NOTIFICATION_URL}/event`)
      .then(response => {
        commit("SET_EVENTS", response.data);
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
  SET_EVENTCATEGORYSELECTED: (state, eventCategorySelected) => {
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
