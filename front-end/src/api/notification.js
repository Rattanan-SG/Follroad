import axios from "axios";

const notificationService = axios.create({
  baseURL: process.env.VUE_APP_NOTIFICATION_URL
});

const postSubscription = (data, config) => {
  return notificationService
    .post("/subscription", data, config)
    .then(response => response.data);
};

const putSubscription = (data, config) => {
  return notificationService
    .put("/subscription", data, config)
    .then(response => response.data);
};

const deleteSubscription = config => {
  return notificationService
    .delete("/subscription", config)
    .then(response => response.data);
};

export default {
  postSubscription,
  putSubscription,
  deleteSubscription
};
