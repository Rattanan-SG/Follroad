const axios = require("axios");

const directionRecord = axios.create({
  baseURL: global.gConfig.direction_record_api
});

exports.getRecord = params => {
  return directionRecord
    .get("/record", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
