const axios = require("axios");

const eventApi = axios.create({
  baseURL: global.gConfig.event_api
});

exports.getEvent = params => {
  return eventApi
    .get("/event", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
