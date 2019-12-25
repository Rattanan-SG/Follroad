require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3002,
    mongo_url: env.MONGO_URL || "mongodb://mongodb/test",
    vapid_public_key:
      env.VAPID_PUBLIC_KEY ||
      "BPv9dLtGAEzGDoR8mIDTZGjPa1nYt_CnU3hkQpLzRyRD62F-CeWrp9AEUfzZ7mB6T_mrbrYktByJQW5djr5q2Hk",
    vapid_private_Key:
      env.VAPID_PRIVATE_KEY || "_KcE9A_s1P0lhsaaLAnsr5Z2pqrSTXhtbLDlY_PMwKI"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3002,
    mongo_url: env.MONGO_URL,
    vapid_public_key: env.VAPID_PUBLIC_KEY,
    vapid_private_Key: env.VAPID_PRIVATE_KEY
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3002,
    mongo_url: env.MONGO_URL,
    vapid_public_key: env.VAPID_PUBLIC_KEY,
    vapid_private_Key: env.VAPID_PRIVATE_KEY
  }
};

module.exports = config[state];
