import axios from "axios";

const eventService = axios.create({
  baseURL: process.env.VUE_APP_EVENT_URL
});

const getEvents = (params, config) => {
  return eventService
    .get("/event", { params, ...config })
    .then(response => response.data);
};

const postEvent = (data, config) => {
  return eventService
    .post("/event", data, config)
    .then(response => response.data);
};

const patchEventById = (id, data, config) => {
  return eventService
    .patch(`/event/${id}`, data, config)
    .then(response => response.data);
};

const deleteEventById = (id, config) => {
  return eventService
    .delete(`/event/${id}`, config)
    .then(response => response.data);
};

export default {
  getEvents,
  postEvent,
  patchEventById,
  deleteEventById
};
