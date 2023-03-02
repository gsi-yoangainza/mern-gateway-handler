const express = require("express");
const router = express.Router();
const {
  getGateways,
  setGateway,
  updateGateway,
  deleteGateway,
} = require("../controllers/gatewayController");

router.route("/").get(getGateways).post(setGateway);

router.route("/:id").put(updateGateway).delete(deleteGateway);

module.exports = router;
