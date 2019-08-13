const axios = require("axios");

const itic = axios.create({
  baseURL: "https://event.longdo.com/feed/json"
});

exports.getExternalEvent = () => {
  return itic.get().then(response => {
    return response.data;
  });
};
