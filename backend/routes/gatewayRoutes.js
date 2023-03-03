const express = require("express");
const router = express.Router();
const {
  getGateways,
  setGateway,
  updateGateway,
  deleteGateway,
} = require("../controllers/gatewayController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGateways).post(protect, setGateway);

router.route("/:id").put(protect, updateGateway).delete(protect, deleteGateway);

module.exports = router;
