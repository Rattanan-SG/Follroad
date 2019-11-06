import axios from "axios";
import { getInstance } from "@/auth";

const eventService = axios.create({
  baseURL: process.env.VUE_APP_EVENT_URL
});

eventService.interceptors.request.use(async config => {
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

const getEvents = (params, config) => {
  return eventService
    .get("/event", { params, ...config })
    .then(response => response.data);
};

const getEventById = (id, params, config) => {
  return eventService
    .get(`/event/${id}`, { params, ...config })
    .then(response => response.data);
};

const getUserEventByUid = (uid, params, config) => {
  return eventService
    .get(`/event/user/${uid}`, { params, ...config })
    .then(response => response.data);
};

const postEvent = (data, config) => {
  return eventService
    .post("/event", data, config)
    .then(response => response.data);
};

const patchEventById = (id, data, config) => {
  return eventService
    .patch(`/event/${id}`, data, config)
    .then(response => response.data);
};

const deleteEventById = (id, config) => {
  return eventService
    .delete(`/event/${id}`, config)
    .then(response => response.data);
};

const getFeedbacks = (params, config) => {
  return eventService
    .get("/feedback", { params, ...config })
    .then(response => response.data);
};

const putFeedback = (data, config) => {
  return eventService
    .put("/feedback", data, config)
    .then(response => response.data);
};

const deleteFeedback = config => {
  return eventService
    .delete("/feedback", config)
    .then(response => response.data);
};

const getFeedbackSummary = (params, config) => {
  return eventService
    .get("/feedback/summary", { params, ...config })
    .then(response => response.data);
};

const getComments = (params, config) => {
  return eventService
    .get("/comment", { params, ...config })
    .then(response => response.data);
};

const postComment = (data, config) => {
  return eventService
    .post("/comment", data, config)
    .then(response => response.data);
};

const patchCommentById = (id, data, config) => {
  return eventService
    .patch(`/comment/${id}`, data, config)
    .then(response => response.data);
};

const deleteCommentById = (id, config) => {
  return eventService
    .delete(`/comment/${id}`, config)
    .then(response => response.data);
};

export default {
  getEvents,
  getEventById,
  getUserEventByUid,
  postEvent,
  patchEventById,
  deleteEventById,
  getFeedbacks,
  putFeedback,
  deleteFeedback,
  getFeedbackSummary,
  getComments,
  postComment,
  patchCommentById,
  deleteCommentById
};
