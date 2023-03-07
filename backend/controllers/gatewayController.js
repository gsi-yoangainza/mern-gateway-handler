const crypto = require("crypto");
const path = require("path");
const asyncHandler = require("express-async-handler");
const Gateway = require("../models/gatewayModel");
const User = require("../models/userModel");

//@desc     Get gateways
//@route    GET /api/gateways
//@access   Private
const getGateways = asyncHandler(async (req, res) => {
  const gateways = await Gateway.find({ user: req.user.id });

  res.status(200).json(gateways);
});

//@desc     Set gateway
//@route    POST /api/gateways
//@access   Private
const setGateway = asyncHandler(async (req, res) => {
  const allGateways = await Gateway.find({ user: req.user.id });
  const exists = allGateways.find(
    (element) => element.serialNumber === req.body.serialNumber
  );
  if (exists) {
    res.status(400);
    throw new Error("Serial number already exists");
  }

  const gateway = await Gateway.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(200).json(gateway);
});

//@desc     Update gateway
//@route    PUT /api/gateways/"id"
//@access   Private
const updateGateway = asyncHandler(async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);

  if (!gateway) {
    res.status(400);
    throw new Error("Gateway not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged user matches the gateway user
  if (gateway.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGateway = await Gateway.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedGateway);
});

//@desc     Delete gateway
//@route    DELETE /api/gateway
//@access   Private
const deleteGateway = asyncHandler(async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);

  if (!gateway) {
    res.status(400);
    throw new Error("Gateway not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged user matches the gateway user
  if (gateway.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Gateway.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGateways,
  setGateway,
  updateGateway,
  deleteGateway,
};
