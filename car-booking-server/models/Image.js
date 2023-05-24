const { model, Schema } = require("mongoose");

const imageSchema = new Schema(
  {
    cloudinary: String,
  },
  { timestamps: true, timeseries: true }
);

module.exports = model("Image", imageSchema);
