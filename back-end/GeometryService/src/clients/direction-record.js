const axios = require("axios");

const directionRecordApi = axios.create({
  baseURL: global.gConfig.direction_record_api
});

exports.getRecordThatReceiveNotification = params => {
  return directionRecordApi
    .get("/record/notification", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

exports.getRecordById = (id, params) => {
  return directionRecordApi
    .get(`/record/${id}`, { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
