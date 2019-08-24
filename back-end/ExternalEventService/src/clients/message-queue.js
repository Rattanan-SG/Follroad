const axios = require("axios");

const messageQueue = axios.create({
  baseURL: global.gConfig.message_queue_api
});

exports.sendMessage = (queueName, data) => {
  return messageQueue
    .post(`/queue/${queueName}/sendMessage`, data)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
