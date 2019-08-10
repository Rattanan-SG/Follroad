const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  global.gConfig.vapid_public_key,
  global.gConfig.vapid_private_Key
);

module.exports = webpush;
