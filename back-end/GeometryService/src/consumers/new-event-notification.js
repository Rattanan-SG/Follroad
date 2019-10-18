const { Consumer } = require("sqs-consumer");
const { consumer } = require("../services");
const { logInfo, logError } = require("../utils/logger");

const eventConsumer = Consumer.create({
  queueUrl: global.gConfig.sqs_new_event_notification_url,
  messageAttributeNames: ["All"],
  handleMessageBatch: async messages =>
    consumer.handleBatchCheckNewEvents(messages),
  batchSize: 10,
  visibilityTimeout: 30
});

eventConsumer.on("error", err => {
  logError("SQS-Consumer error", err);
});

eventConsumer.on("processing_error", err => {
  logError("SQS-Consumer processing_error", err);
});

eventConsumer.on("timeout_error", err => {
  logError("SQS-Consumer timeout_error", err);
});

eventConsumer.on("stopped", () => {
  logInfo("SQS-Consumer stopped");
});

eventConsumer.start();

exports.start = () => {
  eventConsumer.start();
  logInfo("SQS-Consumer start");
  return "SQS-Consumer start";
};

exports.stop = () => {
  eventConsumer.stop();
  return "SQS-Consumer stop";
};

exports.isRunning = () => {
  return eventConsumer.isRunning ? { status: "start" } : { status: "stop" };
};
