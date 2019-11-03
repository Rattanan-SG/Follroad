import axios from "axios";
import { getInstance } from "@/auth";

const notificationService = axios.create({
  baseURL: process.env.VUE_APP_NOTIFICATION_URL
});

notificationService.interceptors.request.use(async config => {
  try {
    const authService = getInstance();
    if (authService.isAuthenticated) {
      const accessToken = await authService.getTokenSilently();
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  } catch (error) {
    return config;
  }
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
