const mongoose = require("mongoose");

const peripheralSchema = mongoose.Schema(
  {
    gateway: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gateway",
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Peripheral", peripheralSchema);
