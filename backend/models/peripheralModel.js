const mongoose = require("mongoose");

const peripheralSchema = mongoose.Schema(
  {
    vendor: String,
    ipv4Address: {
      type: Number,
    },
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Peripheral", peripheralSchema);
