const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BPv9dLtGAEzGDoR8mIDTZGjPa1nYt_CnU3hkQpLzRyRD62F-CeWrp9AEUfzZ7mB6T_mrbrYktByJQW5djr5q2Hk",
  privateKey: "_KcE9A_s1P0lhsaaLAnsr5Z2pqrSTXhtbLDlY_PMwKI"
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = webpush;
