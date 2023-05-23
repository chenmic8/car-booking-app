const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const bookingDetailsSchema = new Schema(
  {
    title: { type: String, default: "Event" },
    beginTime: { type: Date, required: true, default: () => Date.now() },
    endTime: {
      type: Date,
      required: true,
      default: () => Date.now() + 60 * 60 * 1000,
    },
    miles: { type: mongoose.Types.Decimal128, required: true, default: 10 },
    startLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    endLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    driver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    riders: [{ type: Schema.Types.ObjectId, ref: "User" }],
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  },
  { timestamps: true, timeseries: true }
);

module.exports = model("Event", bookingDetailsSchema);
