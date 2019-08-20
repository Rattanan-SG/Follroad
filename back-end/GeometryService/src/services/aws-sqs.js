const { Consumer } = require("sqs-consumer");
const service = require("./index");
const { logInfo, logError } = require("../utils/logger");

const consumer = Consumer.create({
  queueUrl: global.gConfig.sqs_queue_url,
  messageAttributeNames: ["All"],
  handleMessage: async message => {
    service.checkNewEventWithAllRecord(message);
  },
  batchSize: 10,
  visibilityTimeout: 20
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

consumer.on("stopped", () => {
  logInfo("SQS-Consumer stopped");
});

consumer.start();

exports.start = () => consumer.start();

exports.stop = () => consumer.stop();

exports.isRunning = () => consumer.isRunning;
