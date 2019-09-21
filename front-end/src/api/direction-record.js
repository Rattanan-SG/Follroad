import axios from "axios";

const record = axios.create({
  baseURL: process.env.VUE_APP_DIRECTION_RECORD_URL
});

const getRecords = params => {
  return record.get("/record", { params }).then(response => response.data);
};

const postRecord = data => {
  return record.post("/record", data).then(response => response.data);
};

const patchRecordById = (id, data) => {
  return record.patch(`/record/${id}`, data).then(response => response.data);
};

const deleteRecordById = (id, config) => {
  return record.delete(`/record/${id}`, config).then(response => response.data);
};

export default {
  getRecords,
  postRecord,
  patchRecordById,
  deleteRecordById
};
