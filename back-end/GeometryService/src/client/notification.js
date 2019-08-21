const axios = require("axios");

const notification = axios.create({
  baseURL: global.gConfig.notification_api
});

exports.getSubscription = params => {
  return notification
    .get("/subscription", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

exports.sendToSpecificUser = data => {
  return notification
    .post("subscription/send", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

exports.sendToAllUser = data => {
  return notification
    .post("subscription/send/all", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
