const mongoose = require("mongoose");
const Peripheral = require("./peripheralModel");

const gatewaySchema = mongoose.Schema(
  {
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
