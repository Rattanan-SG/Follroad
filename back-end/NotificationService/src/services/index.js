const Subscription = require("../models/subscription");
const webpush = require("../config/webpush");
const { logInfo } = require("../utils/logger");

exports.subscribe = body => {
  const subscription = new Subscription(body);
  return subscription.save();
};

exports.getSubscription = query => {
  const { fields, ...where } = query;
  return Subscription.find(where, fields).lean();
};

exports.updateOrCreateSubscription = body =>
  Subscription.updateOne({ endpoint: body.endpoint }, body, { upsert: true });

exports.unSubscribe = endpoint => Subscription.deleteOne({ endpoint });

exports.getSubscriptionThatUidisNull = () =>
  Subscription.find({ uid: null }).lean();

exports.getSubscriptionById = id => Subscription.findById(id).lean();

exports.renewSubscription = (oldSubscription, newSubscription) =>
  Subscription.updateOne(
    { endpoint: oldSubscription.endpoint },
    newSubscription
  );

exports.updateSubscriptionById = (id, subscription) =>
  Subscription.findByIdAndUpdate(id, subscription, { new: true });

exports.sendNotificationToSpecificUser = async body => {
  const { uid, message } = body;
  const qurey = await Subscription.find({ uid: { $in: uid } }, "endpoint keys");
  const result = await sendMutipleNotification(qurey, message);
  logInfo("Send notification to specific user", { uid, result });
  return result;
};

exports.sendNotificationToAllUser = async body => {
  const { message } = body;
  const qurey = await Subscription.find({}, "endpoint keys");
  const result = sendMutipleNotification(qurey, message);
  logInfo("Send notification to all user", result);
  return result;
};

exports.sendNotification = body => {
  const { endpoint, keys, message } = body;
  const pushSubscription = {
    endpoint,
    keys
  };
  return webpush.sendNotification(pushSubscription, message);
};

const sendMutipleNotification = async (qurey, message) => {
  let successCount = 0,
    failCount = 0;
  const response = await Promise.all(
    qurey.map(({ endpoint, keys }) => {
      const pushSubscription = {
        endpoint,
        keys
      };
      return webpush
        .sendNotification(pushSubscription, JSON.stringify(message))
        .then(data => {
          successCount++;
          return data;
        })
        .catch(err => {
          failCount++;
          return err;
        });
    })
  );
  const result = { successCount, failCount, response };
  return result;
};
