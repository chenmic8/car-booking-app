const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    birthdate: { type: Date },
    phone: { type: Number },
    role: {
      type: String,
      enum: ["admin", "driver", "rider", "owner"],
      default: "rider",
    },
    address: { type: Schema.Types.ObjectId, ref: "Location" },
    profilePic: { type: String },
  },
  { timestamps: true, timeseries: true }
);

module.exports = model("User", userSchema);
