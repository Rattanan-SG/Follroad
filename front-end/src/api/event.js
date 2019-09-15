import axios from "axios";

const event = axios.create({
  baseURL: process.env.VUE_APP_EVENT_URL
});

const getEvents = params => {
  return event
    .get("/event", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

const postEvent = data => {
  return event
    .post("/event", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

export default {
  getEvents,
  postEvent
};
