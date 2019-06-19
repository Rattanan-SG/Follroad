const webpush = require("../webpush/webpush");
exports.home = (req, res) => {
  res.status(200).send({ status: "UP" });
};

exports.send = (req, res) => {
  const pushSubscription = {
    endpoint: req.body.endpoint,
    keys: {
      auth: req.body.auth,
      p256dh: req.body.p256dh
    }
  };
  webpush
    .sendNotification(pushSubscription, "Notification Service !!!!")
    .then(data => {
      console.log(data);
      res.send(data);
    });
};
