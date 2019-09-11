const axios = require("axios");

const directionRecord = axios.create({
  baseURL: global.gConfig.direction_record_api
});

exports.getRecordThatReceiveNotification = params => {
  return directionRecord
    .get("/record/notification", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
