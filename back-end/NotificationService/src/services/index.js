const Subscription = require("../models/subscription");
const webpush = require("./webpush");

exports.register = body => {
  const subscription = new Subscription(body);
  return subscription.save();
};

exports.unsubscribe = () => {};

exports.sendNotification = (endpoint, keys) => {
  const pushSubscription = {
    endpoint,
    keys
  };

  return webpush.sendNotification(
    pushSubscription,
    "Notification Service !!!!"
  );
};
