const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const Peripheral = require("../models/peripheralModel");

//@desc     Get peripheral
//@route    GET /api/peripheral
//@access   Private
const getPeripheral = asyncHandler(async (req, res) => {
  console.log(req.user);
  const peripheral = await Peripheral.find();

  res.status(200).json(peripheral);
});

//@desc     Set peripheral
//@route    POST /api/peripheral
//@access   Private
const setPeripheral = asyncHandler(async (req, res) => {
  const uuid = crypto.randomUUID();
  const peripheral = await Peripheral.create({ ...req.body, uuid });

  res.status(200).json(peripheral);
});

//@desc     Update peripheral
//@route    PUT /api/peripheral/"id"
//@access   Private
const updatePeripheral = asyncHandler(async (req, res) => {
  const peripheral = await Peripheral.findById(req.params.id);

  if (!peripheral) {
    res.status(400);
    throw new Error("Peripheral not found");
  }

  const updatedPeripheral = await Peripheral.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPeripheral);
});

//@desc     Delete peripheral
//@route    DELETE /api/peripheral
//@access   Private
const deletePeripheral = asyncHandler(async (req, res) => {
  const peripheral = await Peripheral.findById(req.params.id);

  if (!peripheral) {
    res.status(400);
    throw new Error("Peripheral not found");
  }

  await Peripheral.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPeripheral,
  setPeripheral,
  updatePeripheral,
  deletePeripheral,
};
