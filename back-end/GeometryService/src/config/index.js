require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3004,
    event_api: env.EVENT_API,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_new_event_notification_url: env.SQS_NEW_EVENT_NOTIFICATION_URL,
    sqs_schedule_check_notification_url: env.SQS_SCHEDULE_CHECK_NOTIFICATION_URL
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3004,
    event_api: env.EVENT_API,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_new_event_notification_url: env.SQS_NEW_EVENT_NOTIFICATION_URL,
    sqs_schedule_check_notification_url: env.SQS_SCHEDULE_CHECK_NOTIFICATION_URL
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3004,
    event_api: env.EVENT_API,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_new_event_notification_url: env.SQS_NEW_EVENT_NOTIFICATION_URL,
    sqs_schedule_check_notification_url: env.SQS_SCHEDULE_CHECK_NOTIFICATION_URL
  }
};

module.exports = config[state];
