import axios from "axios";

const event = axios.create({
  baseURL: process.env.VUE_APP_EVENT_URL
});

const getEvents = params => {
  return event.get("/event", { params }).then(response => response.data);
};

const postEvent = data => {
  return event.post("/event", data).then(response => response.data);
};

const patchEventById = (id, data) => {
  return event.patch(`/event/${id}`, data).then(response => response.data);
};

const deleteEventById = (id, config) => {
  return event.delete(`/event/${id}`, config).then(response => response.data);
};

export default {
  getEvents,
  postEvent,
  patchEventById,
  deleteEventById
};
