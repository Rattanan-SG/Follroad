import axios from "axios";

const directionRecordService = axios.create({
  baseURL: process.env.VUE_APP_DIRECTION_RECORD_URL
});

const getRecords = (params, config) => {
  return directionRecordService
    .get("/record", { params, ...config })
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
  postRecord,
  patchRecordById,
  deleteRecordById
};
