const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const bookingDetailsSchema = new Schema(
  {
    title:{type: String, default:'Event'},
    beginTime: { type: Date, required: true, default: () => Date.now() },
    endTime: {
      type: Date,
      required: true,
      default: () => Date.now() + 60 * 60 * 1000,
    },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    miles: { type: mongoose.Types.Decimal128, required: true, default: 10 },
    driver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    riders: [{ type: Schema.Types.ObjectId, ref: "User" }],
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  },
  { timestamps: true, timeseries: true }
);

module.exports = model("Booking_Details", bookingDetailsSchema);
