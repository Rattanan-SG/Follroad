import axios from "axios";

const record = axios.create({
  baseURL: process.env.VUE_APP_DIRECTION_RECORD_URL
});

const getRecords = params => {
  return record
    .get("/record", { params })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

const postRecords = data => {
  return record
    .post("/record", data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

const patchRecordById = (id, data) => {
  return record
    .patch(`/record/${id}`, data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

const deleteRecordById = (id, config) => {
  return record
    .patch(`/record/${id}`, config)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

export default {
  getRecords,
  postRecords,
  patchRecordById,
  deleteRecordById
};
