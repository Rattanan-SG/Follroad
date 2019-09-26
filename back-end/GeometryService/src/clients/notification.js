const axios = require("axios");

const notificationApi = axios.create({
  baseURL: global.gConfig.notification_api
});

exports.getSubscription = params => {
  return notificationApi
    .get("/subscription", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

exports.sendToSpecificUser = data => {
  return notificationApi
    .post("/subscription/send", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

exports.sendToAllUser = data => {
  return notificationApi
    .post("/subscription/send/all", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
