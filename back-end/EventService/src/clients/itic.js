const axios = require("axios");

const itic = axios.create({
  baseURL: global.gConfig.itic_api
});

exports.getExternalEvent = () => {
  return itic
    .get()
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
