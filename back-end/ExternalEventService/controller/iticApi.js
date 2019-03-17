const axios = require("axios");

const itic = axios.create({
  baseURL: "https://event.longdo.com/feed/json"
});

function getEvents() {
  return itic
    .get()
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  getEvents
};
