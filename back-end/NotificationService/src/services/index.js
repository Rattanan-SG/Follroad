const Subscription = require("../models/subscription");
const webpush = require("./webpush");

exports.subscribe = body => {
  const subscription = new Subscription(body);
  return subscription.save();
};

exports.getSubscription = query => Subscription.find(query);

exports.getSubscriptionThatUidisNull = () => Subscription.find({ uid: null });

exports.getSubscriptionById = id => Subscription.findById(id);

exports.updateSubscriptionById = (id, subscription) =>
  Subscription.findByIdAndUpdate(id, subscription, { new: true });

exports.unsubscribe = endpoint => Subscription.deleteOne({ endpoint });

exports.sendNotification = body => {
  const { endpoint, keys, message } = body;
  const pushSubscription = {
    endpoint,
    keys
  };
  return webpush.sendNotification(pushSubscription, message);
};
