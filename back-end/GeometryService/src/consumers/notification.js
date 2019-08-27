const { Consumer } = require("sqs-consumer");
const { logInfo, logError } = require("../utils/logger");
const service = require("../services");

const consumer = Consumer.create({
  queueUrl: global.gConfig.sqs_notification_url,
  messageAttributeNames: ["All"],
  handleMessageBatch: async messages =>
    service.handleMessageBatchCheckEvents(messages),
  batchSize: 10,
  visibilityTimeout: 10
});

consumer.on("error", err => {
  logError("SQS-Consumer error", err);
});

consumer.on("processing_error", err => {
  logError("SQS-Consumer processing_error", err);
});

consumer.on("timeout_error", err => {
  logError("SQS-Consumer timeout_error", err);
});

consumer.on("stopped", () => {
  logInfo("SQS-Consumer stopped");
});

consumer.start();

exports.start = () => {
  consumer.start();
  logInfo("SQS-Consumer start");
  return "SQS-Consumer start";
};

exports.stop = () => {
  consumer.stop();
  return "SQS-Consumer stop";
};

exports.isRunning = () => {
  if (consumer.isRunning) {
    return { status: "start" };
  }
  return { status: "stop" };
};
