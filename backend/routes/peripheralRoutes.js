const express = require("express");
const router = express.Router();
const {
  getPeripheral,
  setPeripheral,
  updatePeripheral,
  deletePeripheral,
} = require("../controllers/peripheralController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPeripheral).post(protect, setPeripheral);

router
  .route("/:id")
  .put(protect, updatePeripheral)
  .delete(protect, deletePeripheral);

module.exports = router;
