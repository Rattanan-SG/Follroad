const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      index: true
    },
    endpoint: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true }
    },
    option: {
      all: { type: Boolean, default: true },
      specific: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
