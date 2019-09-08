const mongoose = require("mongoose");

const directionRecordSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      index: true
    },
    start: {
      name: { type: String, required: true },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    destination: {
      name: { type: String, required: true },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    name: {
      type: String,
      required: true
    },
    notificationRoutes: [String],
    direction: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    schedule: {
      time: { type: Date },
      day: {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        required: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DirectionRecord", directionRecordSchema);
