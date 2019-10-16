const mongoose = require("mongoose");

const directionRecordSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      index: true,
      required: true
    },
    name: {
      type: String,
      required: true
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
    direction: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    notificationRoutes: [Number],
    notificationTime: [
      {
        time: { type: Date, required: true },
        days: [
          {
            type: String,
            enum: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ]
          }
        ],
        type: {
          type: String,
          enum: ["Onetime", "Schedule"],
          required: true
        },
        ongoing: {
          type: Boolean,
          default: true,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

// TODO: check not same time and day and if type Onetime time must more than now
// directionRecordSchema.pre("validate", function(next) {
//   console.log(111, this.notificationTime);
//   if (this.startDate > this.endDate) {
//     this.invalidate('startDate', 'Start date must be less than end date.', this.startDate);
//   }
//   next();
// });

module.exports = mongoose.model("DirectionRecord", directionRecordSchema);
