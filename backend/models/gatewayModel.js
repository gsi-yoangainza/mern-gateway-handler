const mongoose = require("mongoose");
const Peripheral = require("./peripheralModel");

const gatewaySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    ipv4Address: {
      type: String,
    },
    peripheralDevices: [Peripheral.schema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gateway", gatewaySchema);
