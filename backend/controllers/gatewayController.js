const asyncHandler = require("express-async-handler");
const Gateway = require("../models/gatewayModel");

//@desc     Get gateways
//@route    GET /api/gateways
//@access   Private
const getGateways = asyncHandler(async (req, res) => {
  const gateways = await Gateway.find();

  res.status(200).json(gateways);
});

//@desc     Set gateway
//@route    POST /api/gateways
//@access   Private
const setGateway = asyncHandler(async (req, res) => {
  console.log(req.body);
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error("Please add a text field");
  // }
  const gateway = await Gateway.create(req.body);

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

  await Gateway.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGateways,
  setGateway,
  updateGateway,
  deleteGateway,
};