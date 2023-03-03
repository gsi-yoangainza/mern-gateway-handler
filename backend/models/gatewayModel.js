const mongoose = require("mongoose");
const Peripheral = require("./peripheralModel");

const gatewaySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name!!!"],
    },
    ipv4Address: {
      type: Number,
    },
    peripheralDevices: [Peripheral.schema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gateway", gatewaySchema);
