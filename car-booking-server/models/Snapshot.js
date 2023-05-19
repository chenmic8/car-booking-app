const { model, Schema } = require("mongoose");

const snapshotSchema = new Schema(
  {
    date: { type: Date, default: () => Date.now() },
    family: { type: Schema.Types.ObjectId, ref: "Family" },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking_Details" }],
  },
  { timestamps: true, timeseries: true }
);

module.exports = model("Snapshot", snapshotSchema);
