import axios from "axios";

const event = axios.create({
  baseURL: process.env.VUE_APP_EVENT_URL
});

export default {
  getEvents(params) {
    return event
      .get("/event", { params })
      .then(response => response.data)
      .catch(err => {
        throw err;
      });
  }
};
