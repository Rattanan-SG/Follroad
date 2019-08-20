const { Consumer } = require("sqs-consumer");
const { logError } = require("../utils/logger");

const consumer = Consumer.create({
  queueUrl: global.gConfig.sqs_queue_url,
  handleMessageBatch: async message => {
    // do some work with `message`
  }
});

consumer.on("error", err => {
  logError("SQS-Consumer error", err.message);
});

consumer.on("processing_error", err => {
  logError("SQS-Consumer processing_error", err.message);
});

consumer.on("timeout_error", err => {
  logError("SQS-Consumer timeout_error", err.message);
});

consumer.start();
