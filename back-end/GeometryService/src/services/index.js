const notification = require("./notification");
const directionRecord = require("./direction-record");
const sqs = require("./aws-sqs");
const { logInfo } = require("../utils/logger");

exports.checkRoute = async () => {
  // const messages = await sqs.receiveMessage();
  // if (messages) {
  // return notification.getSubscription();
  // } else {
  // return notification.sendToSpecificUser();
  // return "No messages in queue";
  // }
};
