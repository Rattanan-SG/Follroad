import axios from "axios";
import { getInstance } from "@/auth";

const directionRecordService = axios.create({
  baseURL: process.env.VUE_APP_DIRECTION_RECORD_URL
});

directionRecordService.interceptors.request.use(async config => {
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

const getRecords = (params, config) => {
  return directionRecordService
    .get("/record", { params, ...config })
    .then(response => response.data);
};

const getRecordById = (id, params, config) => {
  return directionRecordService
    .get(`/record/${id}`, { params, ...config })
    .then(response => response.data);
};

const postRecord = (data, config) => {
  return directionRecordService
    .post("/record", data, config)
    .then(response => response.data);
};

const patchRecordById = (id, data, config) => {
  return directionRecordService
    .patch(`/record/${id}`, data, config)
    .then(response => response.data);
};

const deleteRecordById = (id, config) => {
  return directionRecordService
    .delete(`/record/${id}`, config)
    .then(response => response.data);
};

export default {
  getRecords,
  getRecordById,
  postRecord,
  patchRecordById,
  deleteRecordById
};
