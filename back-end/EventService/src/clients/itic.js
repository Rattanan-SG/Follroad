const axios = require("axios");

const iticApi = axios.create({
  baseURL: global.gConfig.itic_api
});

exports.getExternalEvent = () => {
  return iticApi
    .get()
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
