const subscription = require("../domains/subscription");
const webpush = require("../config/webpush");
const { logInfo } = require("../utils/logger");

exports.subscribe = body => subscription.create(body);

exports.getSubscription = query => {
  const { fields, ...where } = query;
  return subscription.findAll(where, fields);
};

exports.updateOrCreateSubscription = body =>
  subscription.updateOne({ endpoint: body.endpoint }, body, { upsert: true });

exports.unsubscribe = endpoint => subscription.deleteOne({ endpoint });

exports.getSubscriptionThatUidisNull = () =>
  subscription.findAll({ uid: null });

exports.getSubscriptionById = id => subscription.findByPk(id);

exports.renewSubscription = (oldSubscription, newSubscription) =>
  subscription.updateOne(
    { endpoint: oldSubscription.endpoint },
    newSubscription
  );

exports.updateSubscriptionById = (id, body) =>
  subscription.updateByPk(id, body, { new: true });

exports.unsubscribeById = id => subscription.deleteByPk(id);

exports.sendNotificationToSpecificUser = async body => {
  const { uid, message } = body;
  const qurey = await subscription.findAll(
    { uid: { $in: uid } },
    "endpoint keys"
  );
  const result = await sendMutipleNotification(qurey, message);
  logInfo("Send notification to specific user", { uid, result });
  return result;
};

exports.sendNotificationToAllUser = async body => {
  const { message } = body;
  const qurey = await subscription.findAll({}, "endpoint keys");
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
